# Acceptance tests and release checklist

Specification for tests, not executed results. Initial status of every test: NOT RUN. Claude must create automated tests where practical and explicit manual scripts for real-device/visual/restore checks. Use separate synthetic identities A/B and unrelated coach B. Record environment, commit, actor, steps, expected/actual, command, timestamp and evidence; never put real health data in test reports.

## End-to-end business acceptance
1. Owner invites coach A, assigns client A; client accepts once. Expired/reused invitation rejected; client cannot self-promote or register a coach. Disabled account with still-valid token denied all private operations. Recovery generic, authorized redirect only.
2. Anonymous reads public site, sees exact approved packages/captions/terms and original content, sends a valid book request. Invalid/spam/duplicate request handled; receipt never says book sent. Owner-only queue and 30-day deletion verified with time-controlled test.
3. Client A completes adaptive intake; required/hidden/Other field behavior correct. Analysis approval absent -> first nutrition publish denied. Approved version -> allowed; old/revoked approval does not silently authorize new unrelated analysis.
4. Coach A creates complete seven-day nutrition/training/mobility draft for A, previews and publishes. A sees exact version; B and coach B do not. Draft changes do not affect published data. Two concurrent editors yield conflict, not lost work. Publish retry produces one version/event.
5. A sees meals with exact portions, units, raw/cooked, macros and authorized recipe images. Diet change request persists and appears in review queue; no prescription changes until deliberate new publication.
6. A starts workout, logs sets/weight/reps or hold duration, leaves/reopens, resumes correctly and completes. Last performance belongs to A, same exercise. Double-submit/retry does not duplicate. Rest day not missed workout. Client cannot change prescribed reps via API.
7. A logs meal partial/missed/completed; no-record remains distinct. Date edit and measurement units validated. Formula fixture: 4 eligible due items with 3 done -> 75%, 1 partial separately; 0 eligible -> N/A. Future/frozen/rest items excluded. Owner-approved formula governs production.
8. Freeze [June 1, June 4) excludes exactly 3 dates; reject overlap and over-allowance. Resume/end dates and remaining days correct once, including duplicate retry. End follow-up appears without auto-renewal/message.
9. A submits InBody/photo only through allowed category/request/consent. Oversize, spoofed MIME, executable, unauthorized object, failed scan and EXIF tested. Quarantined files not downloadable. Coach A sees review inbox, reviews once; A sees intended response but no private note. iPhone camera/gallery/HEIC behavior truthful.
10. Measurements chart and first/latest comparison show actual values/dates, correct units and no invented points. Declined photos not required. Export/deletion request has real tracked status.
11. A sends text to coach A; persisted once across network retry and reconnect, unread count correct. B/coach B cannot read/history/subscribe. Disabled account denied; assignment-change/history-transfer policy tested.
12. In-app notifications generated once on publish/reminder/chat. Quiet hours, client timezone/DST, expiry and freeze respected. Physical iPhone Home Screen web push permission, real receipt, tap auth/deeplink, denied permission and unsubscribe tested. Generic lock-screen content only. Unsupported browser says in-app fallback, not guaranteed background delivery.
13. Weekly PDF matches exact seven-day published snapshot and client A only. Progress PDF matches chosen range, approved formula and units. Long Arabic/English, media, graphs, page breaks and footer inspected on EVERY page. No HTML/SSRF injection. Signed/download job endpoints deny B/coach B and expired links. Open/download on physical Safari works.
14. Rollback creates new version preserving historical logs; old PDF/snapshot still labeled correctly. Disabled/archived library record cannot break existing plan.
15. Restore isolated backup: DB, private file bytes, permissions/config/auth recovery plan. Verify row counts/object checksums, login and authorization tests. Failure means no production readiness claim.

## Security regression suite
For every private table/endpoint, test anonymous, own client, other client, assigned coach, unrelated coach, owner and disabled user. Test SELECT/INSERT/UPDATE/DELETE where applicable, direct DB API, storage object access/signing, PDF job IDs, export, chat realtime, log item ownership and bulk endpoints. Test column-level role/status escalation, malicious owner_id, forged client_id, path traversal, upload overwrite, stale assignment/token, CSRF, XSS, SQL injection, shared-cache session mix-up, forged worker callback, rate limits and sensitive logging. Do not run these against real clients or third-party systems.

## UI/accessibility/performance
Every public and private route at 320/390/768/1280px, Arabic RTL and English LTR, long names, keyboard/focus, 200% zoom, reduced motion, screen-reader labels, empty/loading/error/retry/disabled. No clipped macros or horizontal scrolling for core content. Contrast reviewed. Chrome/WebKit/Firefox browser automation plus physical iPhone Safari, Android Chrome where supported. Emulation does not prove push/camera/download behavior.

Proposed initial budgets (engineering targets, not measured claims): public LCP <=2.5s and CLS <=0.1 at field p75 once traffic exists; staging API p95 <=1s for bounded normal reads under agreed load, background PDF <=60s for standard 7-day job. Define dataset/concurrency/network before testing; suggested staging baseline 20 concurrent synthetic users, 100 clients/coach and 365-day histories. These are capacity fixtures, not a business client cap. Rebaseline before scaling and respect provider quotas.

## Release gates
- All requirement IDs mapped to tests; all required functions present, no dead buttons or fake success.
- No critical/high security, privacy or data-correctness defect. No silent skipped device/PDF/restore tests.
- Business decisions in 08 signed off where launch-affecting, authentic assets and final copy reviewed, no client fixtures in production.
- Privacy/consent/retention reviewed, legal contact and incident owner named; no invented compliance certification.
- Cost/host/domain/SMTP/scheduler/storage plan approved. Secrets set securely and scanned out of bundle/git/logs. No admin test credentials in deliverables.
- Backup/restore evidence and measured recovery targets; observability and rollback tested. No undocumented destructive migrations.
- Owner approves preview, then production separately; smoke tests after release confirm correct domain, auth, uploads, PDF, chat and push. Keep a known rollback artifact and incident contact.

Completion wording must identify tested environment and limitations. Never say zero bugs, fully secure, compliant or production-ready solely because compilation passed.
