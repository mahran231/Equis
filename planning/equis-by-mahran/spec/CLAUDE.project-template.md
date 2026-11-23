# EQUIS project instructions template

Copy or merge this into CLAUDE.md only for the new EQUIS project after inspecting any existing project instructions. This is a user project artifact, not an instruction to unrelated systems.

- Product and brand: EQUIS BY MAHRAN. Read all files in spec/ before implementation. Preserve requirement IDs and decision records.
- Start from a new project; no competitor dependency or forced reuse of earlier code. Do not overwrite existing app/site deployments.
- Use approved original content/assets. Missing assets remain explicit blockers for affected acceptance, never fabricated. No actual client data in fixtures, commits or reports.
- Arabic Egyptian RTL client UI, reviewed English; separate nutrition/training PDF visual masters. Current website palette trials are not final app approval.
- Technical recommendation: Next.js/TypeScript/Supabase, stable compatible versions pinned; document deviations before implementation.
- Server, DB and storage enforce authorization. Roles/assignments/status never trusted from client input. Private access denied by default. No server credentials in public variables or bundles.
- Human coach owns prescriptions. No automated diagnosis, prescriptions, approvals or unapproved new features.
- Secure secret entry through local environment/secret manager, never conversation or version control. No demo production passwords.
- Implementation approval, preview acceptance, production release, spending and real-data import are distinct gates. Never use a broad permission bypass mode to cross them.
- Small reversible phases, tests as specified, direct API negative authorization tests, visual PDF/mobile checks. Mark every result not-run/pass/fail/blocked honestly.
- Maintain TRACEABILITY.md, DECISIONS.md, BUGS.md and IMPLEMENTATION_STATUS.md. Record commands actually run, versions, environment and evidence. No completion claim based only on compile success.
- If context is short or work stops, save current phase, changed paths, commands/tests/results, blockers and next action before ending.
