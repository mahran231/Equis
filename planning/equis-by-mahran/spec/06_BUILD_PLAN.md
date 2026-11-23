# Phased build plan and prompts

No code in this package has been deployed or tested as an application. These prompts are owner-facing development instructions, not permission to bypass confirmations. Keep all requirements in scope; phasing is order, not silent deletion.

## Phase 0 | Plan and prerequisites
Prompt: Read this entire specification. Create architecture decision record, asset manifest, business-decision register, environment/cost plan, threat model and requirements traceability. Report unknowns and independent work. Do not modify existing deployments or create paid services.

Exit: surface scope confirmed, spec IDs preserved, new empty development folder identified, toolchain pinned and proposed, pending owner questions grouped. Existing repository is not required. If a user deliberately chooses to reuse old code later, audit it separately; don't overwrite it.

## Phase 1 | Foundation and secure data
Prompt: After implementation approval, scaffold the new project with pinned compatible versions. Implement design tokens/i18n/layout, environment validation, auth invitation/recovery, roles/assignments/status, ordered schema migrations, RLS/grants/storage policies and owner bootstrap. Use synthetic fixtures only. Write negative authorization tests before UI feature work.

Exit: anonymous/client A/client B/coach A/coach B/owner isolation proven at DB/API/storage level; no role escalation or client key leak; disable enforcement tested with preexisting session; no production migration.

## Phase 2 | Public website
Prompt: Implement WEB requirements with original EQUIS approved copy. Build public content as versioned data, package comparison and truthful contact/free-book request flow. Keep unresolved business terms unpublished. Preview mobile Arabic and English. No automatic book-send/WhatsApp claim.

Exit: routes, links, SEO, valid form/error/anti-abuse, private lead queue and 30-day lead cleanup tested. Missing original media or final palette prevents final branding acceptance, not unrelated backend work.

## Phase 3 | Coach plans and client week
Prompt: Implement coach draft/preview/publish and immutable history with analysis approval gate, library imports, seven-day client view, nutrition/training/mobility detail and change requests. Shared schemas power UI and exports. Add concurrency and cross-client tests. No AI-generated prescriptions or dummy production content.

Exit: coach publishes, correct client reads, unrelated users denied, totals consistent, draft not leaked, historic snapshot unchanged after library edit; client cannot change prescription.

## Phase 4 | Logging, forms, uploads and progress
Prompt: Implement exact-item logs, versioned intake/check-ins, private upload request/consent/quarantine/review and progress comparisons. Add freeze intervals and end-of-program workflow. Leave percentages unavailable until approved formula passes golden tests.

Exit: duplicate/offline retry, timezone/DST/midnight, frozen/zero-denominator cases tested; real mobile upload tested; no cross-client files or synthetic outcome claims.

## Phase 5 | Chat and notifications
Prompt: Implement persisted authorized chat, unread cursor, reconnect reconciliation, durable in-app notification inbox, outbox worker and consent-based web push. Add preferences/quiet hours/revocation and unsupported-browser fallback. Do not mark push done from successful API response alone.

Exit: two authorized sessions communicate, unrelated subscription denied, message retries deduped, frozen/due logic correct; physical iPhone Home Screen push opt-in/receipt and denial/unsubscribe tested. Missing device test blocks full notification acceptance and is reported.

## Phase 6 | PDF and operations
Prompt: Implement weekly plan and range progress PDFs from same immutable snapshot. Respect sanitized nutrition/training masters, reviewed credentials/footer. Render every page. Add backup/storage export and restore rehearsal, incident/privacy/data-rights runbooks. No real records until approval.

Exit: exact-version PDF, no clipping, numerics matched, Arabic shaped, private downloads denied cross-account, restore completed into isolated environment with object hashes and access tests. Owner tutorial includes actual tested flows.

## Phase 7 | Acceptance and release
Prompt: Run complete 07_ACCEPTANCE_TESTS.md against a clean build. Fill each test row with actual command, evidence, result, date and environment. Mark blocked/skipped distinctly, never pass by assertion. Prepare owner preview and acceptance report, costs, domain/host, rollback and unresolved risks. Ask separately before production launch or data import.

Exit: every requirement mapped to passing evidence; no P0/P1 defects, no unknown authorization/privacy issues, all commercial terms/assets signed off, actual device tests complete. Owner explicitly approves deployment and any spending. After launch, smoke tests and observation window with rollback owner named.

## Development reporting template
Phase / environment / commit / versions / changed files / migration IDs / commands run / passed-failed-blocked counts / screenshot-PDF evidence / authorization matrix / deployment status / costs / unresolved decisions / next step.

Store failing tests and bugs with reproduction, impact, fix and regression test. Never hide a failing test by disabling it. Final handover includes source and lockfile, `.env.example`, migrations, test data factory, test reports, content/asset licenses, admin guide, backup/restore/deploy/rollback docs and exact outstanding limitations.
