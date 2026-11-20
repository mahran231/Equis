# IMPLEMENTATION PLAN — PUBLIC WEBSITE ONLY

## Phase 0 — foundation
- Inspect repository and preserve useful code/assets.
- Set up Next.js App Router, TypeScript strict, lint, formatting and test tooling.
- Add locale routing and translation files.
- Add design tokens, fonts and supplied logo assets.
- Add editable business/content configuration.

Exit: app boots, typecheck/lint pass, locale routing works.

## Phase 1 — public site shell
- Header/footer and language switcher.
- Responsive navigation.
- Home page sections.
- Shared page layout and SEO metadata.

Exit: polished responsive shell in Arabic RTL, English and French.

## Phase 2 — public pages
- About.
- Services.
- How It Works.
- FAQ.
- Contact / Consultation.
- Privacy and Terms pages with draft status until approved.
- Transformations and Recipes/Resources pages, disabled until real approved content is supplied.

Exit: all enabled public pages are localized and navigable.

## Phase 3 — enquiry flow
- Contact form with client and server validation.
- Spam protection/rate limiting.
- Provider-neutral delivery adapter.
- Honest success/failure/fallback states.
- No sensitive health questions or data collection.

Exit: enquiry flow works only when provider configuration is valid; otherwise fallback is truthful.

## Phase 4 — polish and launch readiness
- SEO, sitemap, robots, canonical and hreflang.
- Image and font optimization.
- Accessibility review.
- Mobile/desktop visual review.
- Arabic RTL review.
- Run acceptance tests and production build.
- Create BUILD_REPORT.md.

Exit: all acceptance checks pass and remaining content/configuration is documented.
