# Technical implementation specification

## Architecture decision
Recommended from-scratch stack: Next.js App Router + React + TypeScript for public pages and authenticated responsive web UI; Supabase Auth/Postgres/Storage; authenticated server functions/route handlers for privileged workflows; Supabase Realtime or authorized refresh for persisted chat; durable job/outbox mechanism for notifications and PDF work; Playwright for browser E2E, unit/integration tests plus SQL/RLS tests. This is an engineering recommendation, not a user-approved purchase or an existing implementation. Choose one compatible stable set at kickoff, pin versions/lockfile, record Node runtime and commands. Do not mix old framework examples with new auth APIs.

Public pages may be static/cached. Authenticated data and responses must be dynamic/private/no-store; never put user sessions into a shared cache. Supabase SSR uses separate browser/server clients and verified session claims; authenticate and authorize inside every server function, not middleware alone. Review current framework proxy/middleware conventions for the pinned version. Cross-origin requests denied by default. No CDN caching of authenticated PDFs/media.

Suggested structure:
```
app/(public)/             public routes and locale-aware content
app/(auth)/               login/invite/recovery
app/app/                  client routes
app/coach/                coach routes
app/owner/                restricted configuration and assignments
app/api/                  validated authenticated endpoints
components/               accessible RTL/LTR design components
lib/auth/ domain/ db/ validation/ jobs/ pdf/ i18n/
supabase/migrations/ tests/ seed.synthetic.sql
public/brand/             approved non-client assets only
tests/unit/ integration/ e2e/ security/ visual/
docs/                     decisions, deployment, restore, owner guide
```
Do not expose route groups as authorization. Central domain services enforce rules for all callers. Use schema validation for inputs and output DTO allowlists so coach-only fields cannot leak.

## API/action contracts
Every private operation verifies active authenticated actor, role and current client assignment before action. Error envelope: `{code, message, fieldErrors?, correlationId}`. Do not return SQL, stack traces or private existence clues. Typical statuses: 401 unauthenticated, 403 denied (or 404 to avoid existence leakage), 409 stale revision/conflict, 422 invalid data, 429 throttled, 503 retryable service failure. Include request IDs, not sensitive input logs.

- POST `/api/invitations`: authorized role + normalized email + desired permitted role/client assignment. Server uses admin auth, one-time invite flow, idempotency key; never returns password/token to unauthorized caller.
- PATCH `/api/accounts/:id/status`: authorized scope, desired state, expected_version. Transaction records audit and effective access. Owner role changes use separate owner endpoint.
- GET `/api/me/week?start=YYYY-MM-DD`: own published seven-day snapshot and version, not arbitrary client_id from browser.
- PUT `/api/coach/clients/:id/drafts/:draftId`: expected_version + validated whole draft. Response new revision. Reject 409 on conflict.
- POST `/api/coach/clients/:id/plans/publish`: draftId, expected_version, analysis_approval_id, idempotency_key. One DB transaction validates client/program/week, analysis, content, snapshots and switches publication pointer; durable outbox event created in same transaction. Side effects retry after commit.
- POST `/api/logs`: plan_version_id,item_id,local_date,actuals,status,idempotency_key; identity derives from session; validates prescription ownership/units/date policy. PUT edits require expected_version.
- POST `/api/forms/:assignmentId/submit`: form_version, answers, upload_ids, idempotency_key; validate visibility/required fields and upload ownership. Immutable submission.
- POST `/api/uploads/authorize` then `/complete`: purpose/request/category/file metadata; return scoped upload permission, not broad storage access. Completion independently checks stored object, detected MIME, size and scan result before review queue.
- POST `/api/change-requests`: own version/item and reason; no automatic substitution.
- POST `/api/conversations/:id/messages`: body + client_message_id. Persist first, publish authorized event second. Paginate by stable (created_at,id) cursor. Reconnect fetches missing persisted messages, no dependency on event receipt.
- POST `/api/pdf-jobs`: type, authorized plan version or bounded date range, idempotency_key. GET authorized job status; private download rechecks current access.
- POST `/api/programs/:id/freeze`: dates, expected_version. Transaction computes days and allowance; no overlap. Preview response available before commit.
- POST `/api/push-subscriptions`: opt-in subscription; associate session actor, encrypt/restrict sensitive values. DELETE revokes. Generic notification links require authentication.
- POST `/api/book-requests`: public validated name/phone/consent, server anti-abuse; fixed accepted response not data listing.
- POST `/api/data-requests`: own request. Owner review/export/deletion executes via audited workflow, not direct cascading DELETE.

Use bounded request sizes and pagination. Proposed message limit 4,000 characters; pages 25–50; date-range export maximum 365 days per job, or chunked. Tune using load tests. Rate-limit auth/invites, uploads, public forms, chat and job creation, both per actor and appropriate IP/device signals. Do not invent provider default limits.

## Dates, freezes and adherence
Store account IANA timezone (default Africa/Cairo only where client has not chosen one), dates separately from instants. Server calculates calendar boundaries with timezone-aware library, never fixed UTC+2, because DST varies. Week start is configurable; display actual date range. All days visible even when unscheduled.

Proposed freeze interval `[starts_on,resumes_on)`: freezing June 1 and resuming June 4 excludes June 1–3, 3 days. Reject overlap; derive union of freeze dates, don't repeatedly add totals. Program extension and remaining days recomputed from source facts in transaction with version check. Manual start/end dates avoid assuming 3 months means 90 days. Freeze allowance/month semantics require owner sign-off.

Adherence proposal requires owner sign-off before percentages are shown: eligible items are coach-assigned, published items due on completed local dates, within active program and not frozen. Exclude rest/unassigned/future days; distinguish no record. Numerator completed eligible items, partial shown separately rather than arbitrary 50%. Denominator zero -> N/A, not 0%/100%. Report counts and date range; separate meal/workout/mobility, do not average incompatible units. Historical log references stay tied to prescribed version. Explicitly decide effect of republishing a past day; default preserve historical denominator snapshot and audit corrections. Do not display a trusted-looking score before formula approval and golden tests.

Nutrition: use decimal precision with portion basis and nutrient source, no floating-point display drift. Sum ingredient/meal/day from same published data, round only for presentation. Calories may differ from macro-derived 4/4/9 due to sources/fibre/rounding, show reconciliation warning with configurable reviewed tolerance rather than silently overwrite. Validate impossible negative quantities and missing units, flag unusual values for coach review without claiming medical safety thresholds. Session logging supports kg/reps or duration/distance, no treating hold seconds as reps.

## Notifications and chat
Persist in-app notification and outbox first. Idempotent scheduler claims jobs with locking; bounded retries/backoff, failed/dead-letter queue, dedupe key per recipient/event/category. Respect timezone, preferences, quiet hours and program freeze. Purge expired/revoked push endpoints on provider terminal response. Do not use a running browser or open tab as scheduler. No unapproved automatic email/WhatsApp outreach.

Web push requires HTTPS, service worker, manifest, user gesture opt-in and real device tests. On iPhone/iPad, Home Screen web apps on iOS/iPadOS 16.4+ have documented Web Push support; feature-detect, verify current target devices and disclose prerequisites. No Apple Developer membership required just for web push per Apple documentation. Delivery is best effort, never guaranteed; unsupported/denied gets in-app fallback with truthful wording. Service worker caches public shell only, not health API responses or private PDFs; clear private memory/query state on logout/account switch. Push payload generic and recipient-safe.

Chat: authorize persisted messages and private Realtime channels. Users can only mark their own read cursor. Assignment changes revoke old coach access; owner explicitly decides whether new coach sees historical thread. Base safe default creates new thread and archives prior one from new coach until owner permits transfer. Client retains own history subject to retention policy. Never claim read receipt from network send acknowledgment.

## PDF contract
Generate from immutable authorized snapshot server-side, using a maintained renderer supporting Arabic shaping, bidi and embedded licensed fonts. Recommended HTML/print CSS + isolated Chromium worker, subject to deployed runtime limits; no unsafe remote HTML or unrestricted URL fetch (SSRF). Bundle approved fonts/media or authorize retrieval in worker. Sanitize content, escape user input, bound job resources. Separate nutrition and training visual masters. Exports show exact plan version and units, retain original media rights and never embed another client's details. Validate text and pixels on every page including long Arabic labels, multi-page exercise cards, footers, images and charts. Store private artifact with checksum and retention; no permanent link in chat. Test iPhone Safari downloads/opening and accessible retry. Printable preview is not the sole PDF implementation.

## Design and accessibility
No final new app palette has been approved. Build tokenized draft EQUIS theme from supplied identity; preview for owner review. Do not treat ongoing website palette experiments as final app requirements. Token groups: background/surface/text/muted/accent/border/status/spacing/type/radius. Provide RTL logical spacing, bidi isolation for numbers/English units, 44px tap targets, visible keyboard focus, labels/errors linked to inputs, semantic headings, alt text, reduced motion and adequate contrast. Test 320,390,768,1280px, 200% zoom, long names/Arabic and empty states. Tables stack on mobile; do not hide essential units/caveats. Separate secure app from marketing so a redesign cannot change prescriptions.

## Environments and operations
Local/test/staging/production separated by project/config, synthetic accounts only in test. `.env.example` contains names and explanations, never values: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY; server-only SUPABASE_SECRET_KEY (or compatible legacy service-role key), DATABASE_URL only in secure tooling, APP_ORIGIN, VAPID_PUBLIC_KEY/VAPID_PRIVATE_KEY, JOB_AUTH_SECRET, PDF_STORAGE_BUCKET. Prefix public only when deliberately browser-safe. Generate actual secrets securely outside prompts; validate missing config at startup. Never put server key in NEXT_PUBLIC variable.

CI: locked install, lint, typecheck, unit, integration/RLS, E2E, build, dependency/secret scan; disposable test DB only. Migrations reviewed forward/backward compatibility, dry-run on staging copy, backup first, no blanket reset. Restore rehearsal includes DB + private objects + auth/config recovery, validates hashes and access tests. Supabase database backups do not include stored object bytes. Free-tier projects require planned exports/off-site copies; do not promise paid backup features for free. Proposed targets RPO 24h/RTO 4h need owner approval, resources and measured rehearsal before commitment.

Monitoring: structured sanitized errors, health checks, failed jobs, failed backups, storage/DB/egress limits and incident contacts. Alert routing/cost approval outstanding. Rollback: previous app artifact plus compatible schema, or forward fix for irreversible migration; no blind data rollback. Release behind owner-approved preview and separate production confirmation. Costs/limits at chosen host/provider checked at that time, no zero-cost guarantee.
