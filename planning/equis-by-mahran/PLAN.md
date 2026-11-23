# EQUIS BY MAHRAN — Phase 0 plan (PLANNING ONLY, NOT IMPLEMENTATION)

Date: 2026-11-23 · Status: **planning, awaiting owner review and an explicit "ابدأ"** · Nothing built, nothing installed, nothing deployed.

Source of truth: `spec/` (EQUIS_BY_MAHRAN_Claude_Code_Pack_v1, all 12 files SHA-256 verified against `spec/MANIFEST.sha256`) plus the owner's prompt of 2026-11-23. Where they differ, the owner's prompt wins and the difference is logged in `DECISIONS.md`.

## 0. Files read
`spec/00_README_AR.md`, `01_START_PROMPT.md`, `02_BRD.md`, `03_FUNCTIONAL_SPEC.md`, `04_DATA_SECURITY.md`, `05_TECHNICAL_SPEC.md`, `06_BUILD_PLAN.md`, `07_ACCEPTANCE_TESTS.md`, `08_ASSETS_DECISIONS.md`, `09_SOURCES.md`, `requirements.json` (29 IDs), `CLAUDE.project-template.md`.
Existing repository inspected (read-only): `CLAUDE.md`, `README.md`, `AGENTS.md`, `docs/*`, `docs/reference/*` (brand identity PDF, Plan Design DNA, Master Instructions), `src/config/*`, `public/brand/*`, `package.json`, `package-lock.json`.

## 1. Important finding: this repository is the existing public site
`mahran231/Equis` already contains a built, three-locale **EQUIS public marketing website** (Next.js 16.4.6, next-intl, no database), with a root `CLAUDE.md` that **forbids** Supabase, auth, client/coach dashboards and any coaching platform in this repo, and says a coaching platform must be "a separate future project". The new request (and spec `01_START_PROMPT.md` step 2) asks for a from-scratch build **in a new empty project directory** without changing any existing deployment.

Therefore:
- I have not modified any existing site file. Only this `planning/equis-by-mahran/` folder was added on branch `claude/practical-planck-gt5jn0`.
- Where the new codebase lives is decision **D-01** (build-blocking). Recommendation: a new, empty GitHub repo (e.g. `equis-by-mahran`) created by the owner; I cannot create repositories from this session.
- Existing site assets (EQUIS NUTRITION logo, palette in `docs/reference`) are **not** assumed to be the EQUIS BY MAHRAN identity — see D-05.

## 2. Business scope (summary)
Three surfaces, one Web-first codebase:
1. **Public site** — `/`, `/services`, `/packages`, `/about`, `/contact`, `/faq`, `/privacy`, `/terms`, `/free-book`. Arabic (Egyptian, RTL) first, reviewed English. French only after a separate launch decision with reviewed copy. CTA → contact (WhatsApp Business 01055663884), never fake enrollment. Packages Fuel / Transform / Elite with the exact names, prices, durations and captions from the owner prompt. Free-book request = private lead, manual fulfilment, 30-day deletion. SEO/sitemap/structured data for public pages only.
2. **Client web app** (invite-only login) — Today, weekly plan (7 days: meals + resistance/conditioning + warm-up + mobility), nutrition detail, workout session logging, meal/mobility logs, adaptive intake + check-ins, measurements/uploads/progress, single chat thread with assigned coach, in-app notifications + opt-in web push, weekly-plan and progress PDFs, export/deletion requests.
3. **Coach workspace** + **owner admin** — assigned-client management, invitations, plan drafting/preview/publish (immutable versions), analysis-approval gate, review inbox, history/restore, approved libraries, freezes and end-of-program follow-up, reports. Owner: invite coaches, assign/reassign clients, business config (packages copy), lead queue, data requests.

Explicit non-goals: native apps/stores, payment gateway or any automated charging/refund/renewal, automated WhatsApp/email outreach, AI coach or any automated diagnosis/prescription/meal or exercise generation, wearables, community, voice/attachments in chat, marketplace.

## 3. Roles and trust boundaries
| Actor | Can | Cannot |
|---|---|---|
| Anonymous visitor | Read published public content; submit a rate-limited free-book request via server endpoint | Read any table directly; discover whether an account/email exists |
| Client | Own profile (allowed columns only), own published plans/history, own logs/forms/measurements/uploads/chat/notifications/exports | Edit prescriptions, see drafts/unassigned future weeks, see coach-only notes, touch another user's data, change role/status/assignment |
| Coach | Only clients with an **active** assignment to them: drafts, publish, reviews, chat, program/freeze management, invite clients into own scope, disable/reactivate in scope | Self-assign, reassign, change roles, edit owner-only content (packages, public copy), see unassigned clients |
| Owner/admin (Mahran, explicitly provisioned once) | Invite coaches, assign/reassign clients (audited), business configuration, lead queue, data-request workflow | — (every action audited). Ownership does not silently grant any partner. |
| Partner / co-founder | **Nothing** until Mahran authorises a specific identity + role | — |
| Background worker | Narrow server-only jobs (PDF, notifications, lead purge, backups) authenticated by secret | Be called publicly; trust browser-supplied ids |

Enforcement layers (all required, none sufficient alone): Postgres RLS + column grants + constrained `security definer` RPCs → server route handlers/actions that re-verify actor, role, status and current assignment on every call → storage policies tied to DB relations → private Realtime channels. UI hiding/route guards are cosmetic only. Role/status/assignment are read from DB tables, never from JWT user metadata a client can edit. Disabled status is checked on every protected operation (DB function `is_active_actor()`), so a still-valid JWT is refused immediately.

## 4. Architecture decision record (proposed)
| # | Decision | Reason |
|---|---|---|
| ADR-1 | Next.js App Router (16.4.x line), React 19.3, TypeScript 5.9.3 strict, Node 22 LTS | Matches spec; same line already proven in this environment. TS 7.0 just released → not chosen yet (tooling compatibility). |
| ADR-2 | Supabase: Postgres + Auth + Storage + Realtime; `@supabase/ssr` for cookie sessions; secret key server-only | Spec recommendation; RLS-first authorization. |
| ADR-3 | Local dev = Supabase CLI local stack; SQL migrations in `supabase/migrations/`; RLS tests with pgTAP + API-level tests as real synthetic users | Disposable DB only; no remote project until owner approves cost (G-EXT). |
| ADR-4 | Validation with Zod 4 shared between UI, API and PDF; DTO allowlists on every response | Prevent coach-only field leakage. |
| ADR-5 | i18n with next-intl; `ar` (RTL, default) and `en`; `fr` scaffolded but **unpublished** until reviewed | Owner rule on French. |
| ADR-6 | Dates: `date` for local days, `timestamptz` UTC for instants, IANA tz per account (default Africa/Cairo), Temporal-compatible library (`@js-temporal/polyfill` or date-fns-tz, chosen at kickoff after doc check) | DST-safe week boundaries and freezes `[start, resume)`. |
| ADR-7 | Durable outbox table + worker endpoint (secret-authenticated, cron-driven by host scheduler) for notifications, PDFs, lead purge | No reliance on open browser tabs. |
| ADR-8 | PDF: server-side HTML/print-CSS rendered by isolated headless Chromium (Playwright) with embedded licensed fonts; output stored privately with checksum | Correct Arabic shaping/bidi, searchable text. Hosting runtime limits checked at host selection. |
| ADR-9 | Web push via `web-push` (VAPID), PWA manifest + service worker caching **public shell only** | Spec; no health data in caches or lock screen. |
| ADR-10 | Uploads: signed upload to a quarantine path → server completion checks magic bytes/size/checksum → image re-encode + EXIF strip (sharp) → review; malware scanning adapter (provider TBD, launch gate) | OWASP upload guidance. |
| ADR-11 | Downloads of health media/PDFs proxied through an authorizing route (no long-lived signed URLs) | Immediate revocation on disable/reassignment. |
| ADR-12 | Tests: Vitest (unit/integration), pgTAP (RLS), Playwright (E2E, Chromium/WebKit/Firefox), plus manual physical-device scripts | Spec §11/§07. |
| ADR-13 | Hosting: **not selected**. Vercel + Supabase are candidates; costs/regions presented before any account or spend (G-EXT). | Owner gate. |

Version candidates checked on npm 2026-11-23 (to be re-verified and pinned exactly with lockfile at scaffold): next 16.4.6, react/react-dom 19.3.1, typescript 5.9.3, @supabase/supabase-js 2.119.2, @supabase/ssr 0.12.7, supabase CLI 3.3.0, @playwright/test 1.65.1 (container Chromium compatibility to verify; fallback 1.63.0), vitest 5.1.1, zod 4.6.7, next-intl 4.16.0, web-push 4.0.0. Node v22.23.5 in this environment.

## 5. Proposed project structure (new repo)
```
equis-by-mahran/
  spec/                         read-only copy of this pack
  CLAUDE.md                     merged from spec/CLAUDE.project-template.md
  DECISIONS.md  TRACEABILITY.md  IMPLEMENTATION_STATUS.md  BUGS.md
  src/app/[locale]/(public)/    marketing pages + free-book
  src/app/[locale]/(auth)/      login, forgot/reset password, invite accept
  src/app/[locale]/app/         client app (today, plan, nutrition, training, logs, intake, check-ins, progress, uploads, messages, notifications, settings)
  src/app/[locale]/coach/       coach workspace
  src/app/[locale]/owner/       owner-only config, assignments, leads, data requests
  src/app/api/                  validated route handlers (invitations, logs, uploads, pdf-jobs, push, jobs/worker …)
  src/components/               accessible RTL/LTR primitives, tokens
  src/lib/{auth,domain,db,validation,jobs,pdf,i18n,dates,storage,notifications}/
  src/messages/{ar,en,fr}.json
  public/brand/                 approved non-client assets only (placeholders labelled until supplied)
  public/sw.js, manifest        PWA
  supabase/migrations/  supabase/tests/ (pgTAP)  supabase/seed.synthetic.sql (TEST only, never prod)
  tests/{unit,integration,security,e2e,visual}/
  docs/{deployment,restore,runbooks,owner-guide,threat-model,asset-manifest.json}
```

## 6. Phase plan (order, not deletion of scope)
| Phase | Content | Exit evidence | External effects |
|---|---|---|---|
| **أ Foundation & secure data** | Scaffold + pinned toolchain, tokens (draft theme, labelled), i18n/RTL layout, env validation, schema migrations for all spec tables, RLS/grants/storage policies, invitation/recovery/sign-out, owner bootstrap script (one-time, audited), disable enforcement, audit log | pgTAP + API negative tests for anonymous / client A / client B / coach A / coach B / disabled / owner; no service key in bundle (bundle scan) | None (local only) |
| **ب Public site** | WEB-01..03: pages, versioned package config + comparison, contact/WhatsApp, free-book request → private queue, owner queue + manual-sent status, 30-day purge job, SEO/sitemap/robots/structured data (public only) | E2E ar/en at 320/390/768/1280, form validation/rate limit/duplicate, purge time-travel test | None |
| **ج Coach authoring & client week** | Libraries (TEST fixtures until real import), intake + analysis gate, draft editor with revision token, preview-as-client, transactional idempotent publish, immutable snapshots, client Today/Plan/Nutrition/Training views, change requests, history/restore | Acceptance cases 3, 4, 5, 14 | None |
| **د Logs, forms, uploads, progress, freeze** | Idempotent logs, session logging + rest timer, check-in schedules/snapshots, upload request/consent/quarantine/review, measurements + real-data charts, freeze `[start,resume)` + end-of-program inbox, adherence **counts + N/A only** | Cases 6, 7, 8, 9, 10; DST/midnight tests | None |
| **هـ Chat & notifications** | Persisted chat with idempotency + cursors + private Realtime, unread, inbox, outbox worker, preferences/quiet hours, web push opt-in/unsubscribe | Cases 11, 12 (physical iPhone required for full pass) | Needs HTTPS staging for real push → G-EXT |
| **و PDF & operations** | Weekly + progress PDFs from snapshot, page-by-page visual checks, backups (DB + storage bytes), restore rehearsal, runbooks, owner guide | Cases 13, 15 | Restore rehearsal needs an isolated project → G-EXT |
| **ز Acceptance & release** | Full `07_ACCEPTANCE_TESTS.md` on clean build, report, preview for owner | Every ID with evidence | Preview / production / domain / data import = separate gates |

Gates (each needs its own explicit approval): G-START (implementation), G-EXT (any external account/project/cost), G-PREVIEW (owner accepts preview), G-PROD (production deploy/DNS/migration), G-DATA (real client data import).

## 7. Environment & cost plan (no spend authorised)
- Phases أ–د run entirely locally with Supabase CLI + Docker and synthetic TEST data. Docker client and Postgres 16 binaries exist in this container; daemon availability verified at Phase أ start (fallback: plain Postgres 16 + Supabase auth emulation is **not** acceptable for RLS proof — would report as blocked).
- Phase هـ onwards needs an HTTPS staging origin + a hosted Supabase project; I will present provider, region, plan, monthly cost, limits and rollback before creating anything.
- Secrets: `.env.local` (git-ignored) / host secret manager only. `.env.example` lists names only: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, SUPABASE_SECRET_KEY, APP_ORIGIN, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, JOB_AUTH_SECRET, PDF_STORAGE_BUCKET, OWNER_BOOTSTRAP_EMAIL (used once by the bootstrap script). I will never ask for secrets in chat.

## 8. Threat model (summary; full table per threat with test IDs in Phase أ)
IDOR across clients/coaches · self role/status escalation (column grants) · disabled-but-valid JWT · stale signed URLs (proxied downloads) · shared cache/CDN leakage (`no-store` + `private` on all authed responses, SW caches public only) · malicious/polyglot upload · CSRF on cookie mutations (same-origin checks + SameSite) · stored XSS in chat/answers (text-only render, CSP) · SQLi (parameterised only, no dynamic SQL in definer functions) · recovery-link hijack (redirect allowlist) · service-key leak (bundle + git secret scan) · public Realtime topic · guessable PDF job ids (UUID + authz recheck) · forged worker callbacks (HMAC secret) · duplicate retries (idempotency keys + unique constraints) · concurrent publish (row lock + revision) · over-broad export. Each gets a negative test and a documented defense. No compliance (HIPAA/GDPR/Egypt PDPL/Gulf) claims without qualified review.

## 9. What is independent of pending decisions
Everything in Phase أ, most of ب (with package/legal copy flagged unpublished until confirmed), and the engine parts of ج–و using TEST-labelled synthetic fixtures. Owner decisions only block acceptance/launch of the affected parts — see `DECISIONS.md`.
