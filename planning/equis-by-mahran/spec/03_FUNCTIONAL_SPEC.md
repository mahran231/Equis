# Functional requirements and screen contracts

All IDs below are required unless explicitly marked approval-gated. Each route must include loading, genuinely empty, forbidden, offline/network failure, retry and success states. Never show another client's stale cached data during switching. Forms retain unsaved values in memory, warn before navigation and prevent duplicate submits. No offline health-data persistence by default.

## Public website
**WEB-01 Discovery**: `/`, `/services`, `/packages`, `/about`, `/contact`, `/faq`, `/privacy`, `/terms` with Arabic-first navigation, English switch, accessible header and footer. Metadata/canonical/sitemap/robots apply only to public pages; structured data contains only true business information. No private client identifiers in metadata, analytics or URLs indexed by crawlers. Hero/CTA leads to contact, not fake enrollment.

**WEB-02 Packages**: versioned public package copy and comparison, exact names/prices/duration/captions from BRD. Editable through owner-reviewed configuration, not general coach permissions. Disabled/unavailable offers labeled truthfully. Terms acceptance records exact version when used in an enrollment process. No checkout.

**WEB-03 Free book**: `/free-book` has name, phone, country code, purpose notice and consent. Validate phone and throttle spam. Submit creates private request once; success means request received, NOT book sent. Owner review queue exposes manual-send completion and expiry/deletion. Book file must be supplied, reviewed and authorized before any direct download option. No unrestricted public database reads.

## Account and client app
**ACC-01 Authentication**: `/login`, `/forgot-password`, `/reset-password`, invitation accept, sign-out. Invitation only; no public role selection or self-registration into coach. Verify email/recovery redirect allowlist, generic recovery message, expiry, invalid/used link, session refresh and logout. Never email passwords. Owner bootstrap is one-time secure server process with audit; no hardcoded account.

**ACC-02 Account lifecycle**: owner invites coach, assigns client; coach invites client only into their authorized scope. Disable/reactivate preserves records and is enforced at each protected operation, not just next login. Client manages own password; coach triggers secure recovery, cannot read passwords. Changed role/assignment takes effect without trusting editable profile metadata.

**CLI-01 Today**: `/app/today`: correct client name, current local day, program week/status, published meals, scheduled workout/mobility, missing-log prompts, next check-in and unread count. No plan means clear waiting-for-coach state. Frozen/completed program shows exact status; no invented streak or adherence score.

**CLI-02 Weekly plan**: `/app/plan?week=...`: all seven days, meals, resistance/conditioning/warm-up/mobility, instructions and exact published version. Week/day controls and previous available weeks. Rest/unassigned days distinguished. No access to drafts/future unassigned versions. Download full week PDF. Mobile cards and printable representation share the same underlying snapshot.

**CLI-03 Nutrition**: `/app/nutrition`, `/app/meals/[id]`, `/app/recipes/[id]`: meal timing/order, English meal title, Arabic ingredients/grams, raw/cooked state, per-serving calories/protein/carbs/fat and approved notes/allergens. Daily totals derived from assigned portions. Food image belongs to that dish and is authorized; absent image gets neutral state. Recipe ingredients and steps are original EQUIS content. Request-change action captures reason/constraints without modifying prescription. Changes take effect only after coach publishes a new version.

**CLI-04 Workout and mobility**: `/app/training`, `/app/training/[sessionId]`: ordered exercises, library illustration/instructions, sets/reps/rest, time or hold target as applicable, equipment and coach progression notes. Session start/resume/finish; per-set weight/reps/duration logging with units; last performance from THIS client's same exercise only. Rest timer pauses/resumes without claiming background precision. Warm-up, fitness/cardio and mobility can use duration/distance/effort as prescribed. Cannot replace prescribed exercises automatically.

**CLI-05 Logs**: meals done/partial/missed/not-recorded; workout sets and completion; mobility completion; optional client note. Timestamp, client local date, prescription/version and unique event key. Edit own logs with history where needed. Duplicate taps/retries do not create duplicate adherence. Missed is not synonymous with no record. Coach correction is explicit, attributed and audited, not silent rewriting.

**CLI-06 Intake and check-ins**: `/app/intake`, `/app/check-ins`, `/app/check-ins/[id]`: versioned coach-approved question forms, draft/save/submit, required-field validation, safe upload and submitted receipt. Intake covers identity/age, goal, anthropometrics, activity, sleep, food preferences/allergies, schedule, constraints and health concerns as necessary; 20–30 adaptive MCQs, Other option, known answers skipped. Do not invent clinical thresholds. Check-in schedule is assigned by coach; submission locks a snapshot, corrections are revisions. Coach review status is visible without exposing private coach-only notes.

**CLI-07 Progress/files**: `/app/progress`, `/app/uploads`: dated weight and body measurements with unit/date, private InBody/body-measurement files and personal photos only when explicitly requested/consented. Plot real observations without interpolating invented readings. Compare first/latest or selected records with date labels. Photo order and units clear; photos not required when declined. No public transformations. Upload progress, cancel/retry and duplicate handling; only approved formats. Client can request export/deletion through actual workflow, not a dead button.

**CLI-08 Coach chat**: `/app/messages`: one client-assigned-coach thread; text send, history, unread, paginated messages, safe rendering, server timestamp and clear pending/sent/failed states. Sent means persisted, not necessarily read or delivered to a device. Retry same message idempotency key. No voice/video/attachments unless later approved. Thread access follows current assignment. No AI impersonation or automated coach replies.

**CLI-09 Notifications**: `/app/notifications`, `/app/settings/notifications`: durable in-app inbox and explicit opt-in web push for workouts, meals, check-ins, coach replies and newly published plans. Quiet hours, timezone, categories, unsubscribe, unsupported/denied permission state. Push text generic, no health details on lock screen. In-app reminders work even when push unavailable; disclose that fallback does not reach a closed app. Test actual device receipt before marking push complete.

**CLI-10 Exports**: weekly plan and date-ranged progress PDF with client identity, dates, units, snapshot version, brand/footer and no other client data. Progress report preview must be reviewed before sharing. Download only to authenticated authorized user; job status and retry. Arabic text searchable/legible and unclipped. No automatic external share/email.

## Coach workspace
**COA-01 Client management**: `/coach/clients`, `/coach/clients/[id]`: assigned client search/pagination, account status, program dates, current plan, private submissions and contact. Create invitation, disable/reactivate within scope; no fake password reset tool. Owner-only assignment/reassignment process audits access changes and handles thread transfer explicitly.

**COA-02 Plan authoring**: client plan drafts covering nutrition/training/mobility and complete week. Select approved exercise library records, arrange days/order, set portions/macros and instructions. Validate ownership, required units, duplicate order, missing media, unsafe empty prescription and inconsistent totals. Save draft with revision token. Preview as correct client; publish is deliberate, transactional and immutable. Concurrent edit conflict returns comparison, never last-writer-wins silently. No data copied from other clients by default.

**COA-03 Intake/analysis gate**: review intake and prepare analysis; record exact analysis version and owner/coach approval before first nutrition publication. Owner-approved exception records reason. Do not fabricate approval or generate a clinical assessment automatically.

**COA-04 Review inbox**: new uploads/check-ins/change requests grouped by assigned client and date. Filter pending/reviewed, open full authorized record, add client-visible response separately from coach-only notes, mark reviewed. Persist review actor/time; double-click safe. No automatic plan changes on review.

**COA-05 History**: list versions/author/time/difference summary; restore creates NEW draft or published revision after preview/confirmation. Never delete log references to old prescriptions. Original and restored revisions remain auditable.

**COA-06 Library**: filter approved exercise/recipe records by name/category/equipment/media variant. Preserve original numbering and male/female illustrations when supplied; never infer a client's preferences from sex. No invented exercise descriptions or nutritional content in production. Owner approves additions/import batches. Archived library items remain in historical plan snapshots.

**COA-07 Freeze/end follow-up**: view program remaining time, owner-entered allowance, freeze dates and reason. Proposed half-open date interval rules in technical spec. Confirm extension before commit; preserve all logs/history. Paused dates excluded from adherence denominator. End-of-program inbox and manual follow-up task, no automatic renewal or message. Overlapping freezes rejected.

**COA-08 Reports and communication**: progress comparison, approved date-range PDF, assigned-client chat, check-in form/schedule management and reminder settings. Reports do not claim clinical outcomes. Export/sharing never broadens access silently.

## Cross-cutting
**SYS-01** server/database/storage authorization and audit. **SYS-02** accurate units, dates and adherence. **SYS-03** responsive RTL/LTR and accessibility. **SYS-04** backup/restore, monitoring, migrations and rollback. **SYS-05** data-rights and retention workflow. **SYS-06** validated content/assets and translations. Every requirement is mapped to tests and a release gate in the package.
