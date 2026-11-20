# EQUIS Public Website — Claude Code Handoff

This repository is for the **public EQUIS website only**.

There is no coaching platform in this scope:
- No client portal
- No coach portal
- No admin dashboard for coaching
- No client profiles or health records
- No nutrition/training plan management
- No check-ins, measurements, progress charts, or private messaging
- No coaching-platform authentication or role system

## Website purpose
Present EQUIS professionally, explain its services and coaching approach, build trust using approved content, and generate consultation enquiries.

## Recommended stack
- Next.js App Router
- TypeScript (strict)
- Tailwind CSS
- Accessible reusable UI components
- React Hook Form + Zod for the enquiry form
- Optional lightweight enquiry persistence provider, configured only if needed
- Vercel deployment

Do not add Supabase, a database, authentication, a CMS, payments, or other backend infrastructure unless the owner explicitly requests it later. The initial site should be a fast, maintainable public marketing website.

## Start
1. Read `CLAUDE.md`.
2. Read all files in `docs/`.
3. Inspect and use the original brand assets in `public/brand/`.
4. Implement the phases in `docs/IMPLEMENTATION_PLAN.md`.
5. Run the checks in `docs/ACCEPTANCE_TESTS.md`.
6. Report completed work and any content/configuration still needed.

## Missing business details
Use editable placeholders in `src/config/business.ts`. Do not invent phone numbers, email addresses, social links, prices, testimonials, transformations, credentials, or legal copy. Hide incomplete sections until real approved content is supplied.

## Development
```bash
npm install
npm run dev        # http://localhost:3000 (redirects to /ar, /en or /fr)
npm run check      # typecheck, lint, unit tests, production build
npm run test:e2e   # Playwright end-to-end tests (run after build)
```
See `docs/BUILD_REPORT.md` for build status and remaining launch items.
