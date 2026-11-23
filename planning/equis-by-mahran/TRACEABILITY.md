# TRACEABILITY.md — requirement → route / service / migration / test

Status 2026-11-23: **planning only.** Every column below is the *planned* location; nothing exists yet. Test result for every ID: `NOT_RUN`. IDs preserved exactly from `spec/requirements.json` (29 IDs).

| ID | Title | Phase | Route(s) (planned) | Service (planned) | Tables / migration (planned) | Tests (planned) | Acceptance refs | Result |
|---|---|---|---|---|---|---|---|---|
| WEB-01 | Discovery | ب | /[locale], /services, /packages, /about, /contact, /faq, /privacy, /terms | lib/content, lib/seo | public_content_versions | e2e/public.spec, visual | 2, UI, RELEASE | NOT_RUN |
| WEB-02 | Packages | ب | /[locale]/packages | lib/domain/packages | package_versions | unit/packages, e2e/packages | 2 | NOT_RUN |
| WEB-03 | Free book | ب | /[locale]/free-book, /owner/leads, POST /api/book-requests | lib/domain/leads, jobs/purge-leads | book_requests, consents | integration/book-requests, e2e/free-book | 2 | NOT_RUN |
| ACC-01 | Authentication | أ | /login, /forgot-password, /reset-password, /invite/[token] | lib/auth | profiles, role_memberships, audit_events | security/auth, e2e/auth | 1, SECURITY | NOT_RUN |
| ACC-02 | Account lifecycle | أ | /owner/coaches, /coach/clients, POST /api/invitations, PATCH /api/accounts/:id/status | lib/domain/accounts | role_memberships, coach_assignments | pgtap/accounts, security/disabled-session | 1, 11, SECURITY | NOT_RUN |
| CLI-01 | Today | ج | /app/today | lib/domain/today | (reads) | e2e/today | 4, 7, 8, 12 | NOT_RUN |
| CLI-02 | Weekly plan | ج | /app/plan, GET /api/me/week | lib/domain/plans | plan_versions, plan_publications | pgtap/plans, e2e/plan | 4, 13 | NOT_RUN |
| CLI-03 | Nutrition | ج | /app/nutrition, /app/meals/[id], /app/recipes/[id] | lib/domain/nutrition | recipes, change_requests | unit/nutrient-totals, e2e/nutrition | 5 | NOT_RUN |
| CLI-04 | Workout and mobility | د | /app/training, /app/training/[sessionId] | lib/domain/training | workout_sessions, exercise_set_logs | integration/sessions, e2e/workout | 6 | NOT_RUN |
| CLI-05 | Logs | د | POST/PUT /api/logs | lib/domain/logs | meal_logs, mobility_logs | integration/logs-idempotency, unit/adherence | 7 | NOT_RUN |
| CLI-06 | Intake and check-ins | ج/د | /app/intake, /app/check-ins, POST /api/forms/:id/submit | lib/domain/forms | intake_forms, checkin_forms, form_assignments, form_submissions | unit/form-branching, e2e/intake | 3, 9 | NOT_RUN |
| CLI-07 | Progress/files | د | /app/progress, /app/uploads, /api/uploads/*, POST /api/data-requests | lib/storage, lib/domain/progress | measurement_entries, upload_requests, uploads, consents, data_requests | security/uploads, e2e/progress | 9, 10 | NOT_RUN |
| CLI-08 | Coach chat | هـ | /app/messages, POST /api/conversations/:id/messages | lib/domain/chat | conversations, messages, conversation_reads | security/realtime, e2e/chat | 11 | NOT_RUN |
| CLI-09 | Notifications | هـ | /app/notifications, /app/settings/notifications, /api/push-subscriptions | lib/notifications, jobs/outbox | notifications, notification_preferences, push_subscriptions, notification_jobs | integration/outbox, manual/iphone-push | 12 | NOT_RUN |
| CLI-10 | Exports | و | POST/GET /api/pdf-jobs | lib/pdf | pdf_jobs | visual/pdf-pages, security/pdf-access | 13 | NOT_RUN |
| COA-01 | Client management | أ/ج | /coach/clients, /coach/clients/[id], /owner/assignments | lib/domain/clients | coach_assignments, audit_events | pgtap/assignments, e2e/coach-clients | 1, 4, SECURITY | NOT_RUN |
| COA-02 | Plan authoring | ج | /coach/clients/[id]/plans/[draftId], PUT drafts, POST publish | lib/domain/plans/publish | plan_drafts, plan_versions, plan_publications | integration/publish-concurrency, e2e/authoring | 4 | NOT_RUN |
| COA-03 | Intake/analysis gate | ج | /coach/clients/[id]/analysis | lib/domain/analysis | coaching_analyses | integration/analysis-gate | 3 | NOT_RUN |
| COA-04 | Review inbox | د | /coach/inbox | lib/domain/reviews | uploads, form_submissions, change_requests, coach_private_notes | security/private-notes, e2e/inbox | 5, 9 | NOT_RUN |
| COA-05 | History | ج | /coach/clients/[id]/history | lib/domain/plans/history | plan_versions | integration/restore | 14 | NOT_RUN |
| COA-06 | Library | ج | /coach/library | lib/domain/library | exercise_library, recipes | integration/library-snapshot | 4, 14 | NOT_RUN |
| COA-07 | Freeze/end follow-up | د | /coach/clients/[id]/program, POST /api/programs/:id/freeze | lib/domain/programs | programs, program_freezes | unit/freeze-intervals, integration/freeze | 8 | NOT_RUN |
| COA-08 | Reports and communication | و | /coach/clients/[id]/reports | lib/domain/reports | pdf_jobs, form_assignments | e2e/reports | 10, 11, 13 | NOT_RUN |
| SYS-01 | Server/DB/storage authorization & audit | أ | all private routes | lib/auth/authorize | all RLS/grants/storage policies | pgtap/*, security/* | SECURITY | NOT_RUN |
| SYS-02 | Units, dates, adherence | د | — | lib/dates, lib/domain/adherence | — | unit/dates-dst, unit/adherence | 7, 8 | NOT_RUN |
| SYS-03 | Responsive RTL/LTR & a11y | all | all | components/* | — | visual/*, a11y/* | UI | NOT_RUN |
| SYS-04 | Backup/restore, monitoring, migrations, rollback | و | — | ops scripts, docs/runbooks | migrations policy | manual/restore-rehearsal | 15, RELEASE | NOT_RUN |
| SYS-05 | Data rights & retention | ب/د/و | /app/settings/data, /owner/data-requests | jobs/purge-leads, lib/domain/data-requests | data_requests, consents | integration/data-requests | 10, RELEASE | NOT_RUN |
| SYS-06 | Validated content/assets & translations | all | — | docs/asset-manifest.json, lib/content | public_content_versions | unit/content-integrity | 2, 5, 13, RELEASE | NOT_RUN |
