# DEPLOYMENT

## Requirements
- Git repository.
- Vercel or equivalent Next.js hosting.
- Domain and DNS access.
- Optional enquiry delivery provider, if the contact form is to submit online.

## Setup
1. Install dependencies.
2. Copy `.env.example` to `.env.local`.
3. Add only the variables required by the selected enquiry provider.
4. Run lint, typecheck, tests and production build.
5. Deploy a preview.
6. Review all locales and responsive breakpoints.
7. Approve public copy, contact information, privacy and terms.
8. Connect the production domain and deploy.

## Launch checks
- HTTPS enabled.
- Domain redirects/canonical configured.
- Contact form delivery tested end-to-end.
- Privacy and terms reviewed.
- Analytics, if used, contains no enquiry payload or sensitive data.
- No placeholder content or links visible.

## Rollback
Use the hosting provider's previous known-good deployment. Keep content/configuration changes version-controlled.
