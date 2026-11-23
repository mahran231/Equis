# Sources and evidence boundaries

Checked 23 November 2026. This is an original EQUIS specification, not a description or copy of another product. No competitor link, account or code is needed to implement it.

## Business grounding
Direct instructions in the current conversation: prepare a self-contained BRD from scratch, all details needed for Claude Code, 100% EQUIS, covering actual functions rather than appearance. This is a preparation request, not permission to launch or spend.

Earlier owner decisions retained: Nov 21 web application first, stores deferred; full weekly nutrition/training/mobility view and PDF; coach authors plans, client submits InBody/measurements/photos when requested; selected review inbox, comparison, history/rollback, in-app missed-log prompts, exercise library, freeze, progress PDF and end follow-up. Latest brand wording EQUIS BY MAHRAN and public Certified Nutritionist title retained. Latest approved nutrition master supersedes older instructions. Ongoing public-site palette experiments are not a final app style guide.

Commercial package details are recorded baseline with later Nov 22 copy taking precedence; unresolved differences are launch gates. This pack includes no actual client data, source transcript, passwords or private integration exports.

## Technical primary sources
Use these to check implementation syntax for the exact versions selected, not as permission to add unrelated workflows.

1. Next.js installation and App Router/runtime setup: https://nextjs.org/docs/app/getting-started/installation . Verify compatible runtime/dependencies and pin exact versions at kickoff.
2. Supabase SSR client/session handling: https://supabase.com/docs/guides/auth/server-side/creating-a-client . Server verification, cookie refresh and cache considerations depend on framework version.
3. Supabase Row Level Security: https://supabase.com/docs/guides/database/postgres/row-level-security . Grants plus row policies; secret/service-role credentials must not be exposed to clients.
4. Supabase private/public storage: https://supabase.com/docs/guides/storage/buckets/fundamentals . Private downloads require authorization or limited-time signed URLs.
5. Supabase storage access control: https://supabase.com/docs/guides/storage/security/access-control . Storage RLS and server-only privilege boundaries.
6. Supabase Realtime authorization: https://supabase.com/docs/guides/realtime/authorization . Authorize private channels; do not assume a channel name protects messages.
7. Supabase administrative account creation: https://supabase.com/docs/reference/javascript/auth-admin-createuser . Administrative operations stay server-side and require app-level authorization.
8. Supabase backup limitations: https://supabase.com/docs/guides/platform/backups . Database backups do not contain Storage API object bytes; free-tier exports/off-site backup need their own plan.
9. Apple Web Push: https://developer.apple.com/documentation/usernotifications/sending-web-push-notifications-in-web-apps-and-browsers.md . HTTPS/service worker/user gesture/subscription server requirements; iOS Home Screen support prerequisites; no Apple Developer membership needed just for web push.
10. Playwright emulation: https://playwright.dev/docs/emulation . Browser/device emulation assists testing, not physical-device certification.
11. OWASP file upload guidance: https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html . Defense in depth, allowlisting, size/content checks, safe storage and malware handling.
12. Claude Code permissions: https://code.claude.com/docs/en/permissions/ and project instructions https://code.claude.com/docs/en/claude-md . Review local project instructions and keep permission boundaries; never use this package as authorization for unrelated effects.

## Proposal versus fact
Stack, logical schema, route names, limits, job design, target timings, adherence algorithm and recovery objectives are proposed implementation contracts. They are not claims about existing software or current paid-provider entitlements. Prices/quotas/hosting availability require checks at selection time. No guarantee of zero bugs, universal push delivery, free production hosting or regulatory compliance is made.
