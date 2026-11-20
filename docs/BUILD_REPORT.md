# EQUIS Public Website — Build Report

Date: 2026-11-20 · Scope: public marketing website only (Phases 0–4 of `IMPLEMENTATION_PLAN.md`).

## Summary

The site is built and every automated check passes. It is **not ready for public launch yet**. Launch needs owner content and configuration (see "Before launch"). Until `contentConfig.copyApproved` is set to `true`, every page shows a small preview banner and search engines are asked not to index the site.

The site has no coaching-platform features. There is no login, dashboard, database, health data, plan management, messaging or payments.

## Stack

- Next.js 16.4 (App Router, Turbopack, `src/proxy.ts` for locale routing), React 19.3, TypeScript strict
- Tailwind CSS 4 (brand tokens in `src/app/globals.css`)
- next-intl 4: `ar-EG` (default, RTL), `en`, `fr`. URLs use `/ar`, `/en` and `/fr`.
- React Hook Form + Zod 4: one schema shared by the browser and the server
- Vitest (unit tests) and Playwright (end-to-end tests)
- No database, CMS, auth, analytics or Supabase

## Pages

| Page | Route | Status |
|---|---|---|
| Home | `/{ar,en,fr}` | Done |
| About | `/…/about` | Done. Founder name only (see credential note below). |
| Services | `/…/services` | Done. No prices, no guarantees. |
| How it works | `/…/how-it-works` | Done. Explanatory only. |
| FAQ | `/…/faq` | Done. Answers are drafts awaiting approval. |
| Contact / Consultation | `/…/contact` | Done. WhatsApp is the main action; the form is disabled until a provider is configured. |
| Privacy policy | `/…/privacy` | Draft, marked "not legally reviewed" |
| Terms of use | `/…/terms` | Draft, marked "not legally reviewed" |
| Transformations | `/…/transformations` | Hidden (404). Needs the flag **and** consented items. |
| Recipes / resources | `/…/resources` | Hidden (404). Needs the flag **and** approved items. |

Unknown paths return a localized 404. `/` redirects to the visitor's browser language if supported, otherwise to Arabic, and remembers the choice in a cookie.

## Where things live

- `src/config/business.ts`: contact details and social links. Blank values are never rendered.
- `src/config/content.ts`: visibility and approval flags (`copyApproved`, `legalReviewed`, `transformationsEnabled`, …).
- `src/config/pages.ts`: one list that drives navigation, the footer and the sitemap.
- `src/content/approved.ts`: empty, typed lists for real testimonials, transformations and resources. Testimonials and transformations require `consentConfirmed: true`.
- `src/messages/{ar-EG,en,fr}.json`: all copy. A test enforces identical keys across the three files.
- `src/lib/enquiry/`: provider-neutral delivery adapter and request handler.
- `public/brand/`: original logo files (unchanged). `public/brand/web/` holds web copies with only the transparent padding trimmed.

## Enquiry form

- Fields: name, email and/or phone (at least one), country, goal, preferred contact method, short message, consent. It has **no** health, body or medical fields, and a test enforces this.
- Validation runs in the browser and again on the server with the same Zod schema.
- Spam protection: a hidden honeypot field, a minimum fill time of 3 s, a limit of 5 requests per 10 min per IP (in-memory, per server instance), a same-origin check and a 10 KB body cap.
- Success is shown **only** when the provider returns 2xx.
  - With no provider: the API returns `503 not_configured` and the page shows an honest notice with the submit button disabled.
  - If delivery fails: the visitor sees an error message, never a success.
- Logs record only outcome codes, never names, contact details or messages (tested).
- Providers, set in `.env`:
  - `ENQUIRY_PROVIDER=resend`: also needs `ENQUIRY_PROVIDER_API_KEY`, `ENQUIRY_DESTINATION` (receiving inbox) and `ENQUIRY_FROM` (verified sender).
  - `ENQUIRY_PROVIDER=webhook`: `ENQUIRY_DESTINATION` must be an `https://` URL; `ENQUIRY_PROVIDER_API_KEY` is an optional bearer token.
- The contact page reads this configuration at request time, so changing the env vars takes effect without a rebuild.
- **Not yet tested end-to-end against a real provider**, because none is configured. Do that before launch.

## Tests and checks (all passing)

| Command | Result |
|---|---|
| `npm run typecheck` | Pass |
| `npm run lint` | Pass (0 warnings) |
| `npm test` (Vitest) | 35 / 35 pass |
| `npm run build` | Pass |
| `npm run test:e2e` (Playwright) | 42 / 42 pass |

What the end-to-end suite covers:
- All 24 page/locale combinations: status 200, `lang` and `dir` set correctly, a single h1, canonical plus 4 hreflang links, logo artwork present, and no empty, `#` or placeholder links.
- No horizontal overflow at 320 / 360 / 390 / 768 / 1280 px in every locale.
- Every internal link resolves.
- The language switcher keeps the visitor on the equivalent page and remembers the choice.
- Arabic is the fallback language.
- Hidden pages and `/login`, `/dashboard`, `/admin` and `/checkout` all return 404.
- Mobile menu keyboard and Escape handling, the skip link, and the focus outline.
- Robots, sitemap and OG image.
- Legal-draft notices are shown.
- Form behaviour:
  - With no provider: the honest notice appears and the submit button is disabled.
  - Validation errors are accessible.
  - A delivery failure shows an error, never a success.
  - Success is shown only when the server confirms.
  - The form posts only the allowed fields.

Accessibility notes:
- Contrast was checked for the token pairs in use. Evergreen on cream is 10.4:1. The smallest muted text is 5.5:1 or better. Error text uses a darker clay (`#8A5238`, 5.6:1 on cream). Raw clay `#A9684A` (3.9:1) is used only for non-text accents.
- Focus states are visible.
- Form fields have labels, `aria-invalid` and `aria-describedby`.
- Reduced-motion preferences are respected.

Screenshots: `docs/screenshots/`.

## Acceptance checklist (`ACCEPTANCE_TESTS.md`)

- **Scope and exclusions:** all pass. There are no login, dashboard, database, upload, check-in, messaging or payment features.
- **Pages and navigation:** all pass. Privacy and Terms are visibly marked as drafts.
- **Localization:** all pass. Phone examples inside Arabic text are wrapped in LTR `<bdi>` so "+20" displays correctly.
- **Brand:** the supplied artwork is used without distortion, colours match the approved values, and Manrope and Newsreader are used for Latin text.
  - For Arabic, Noto Sans Arabic is used for all text, including headings, because Newsreader has no Arabic glyphs.
  - Still to check: rendering on real devices.
- **Enquiry form:** all pass with no provider configured. Real delivery still needs testing once a provider is set up.
- **Content integrity:**
  - No testimonials, transformations, prices, guarantees, credentials or contact details were invented.
  - The FAQ and service copy is based on `CONTENT_AND_COPY.md` and the PRD. Answers to questions the docs leave open (online vs in person, gym requirements) defer to the consultation instead of making claims.
- **Quality:**
  - Keyboard use, focus states, labels and SEO metadata are in place.
  - Images are served through `next/image` in AVIF/WebP, and fonts through `next/font` with no layout shift.

## Decisions to review

1. **Founder credential not published.** `EQUIS_Master_Project_Instructions.md` lists "NASM Certified Personal Trainer (CPT)". However, the supplied expiry date (26/09/2026) has already passed and is earlier than the date the credential was supplied (27/09/2026).
   - The About page therefore shows only "founded and led by Dr. Mahran Mohamed".
   - To add the credential, confirm its current validity and add the approved wording to `about` in each messages file.
2. **Client meal-plan PDF excluded from the repository.** `EQUIS_Ahmed_Ali_7_Day_Meal_Plan_AR.pdf` contains a real client's personal plan. It was not committed, and `.gitignore` blocks it.
3. **Browser-language redirect.** `/` follows the browser's language (for example, an English browser goes to `/en`). Arabic is the fallback and the `x-default` hreflang. Setting `localeDetection: false` in `src/i18n/routing.ts` would always send `/` to Arabic.
4. **No photography yet.** The design is typographic and uses the brand symbol. Add licensed, authentic photography when it is available.
5. **Rate limiting is per server instance.** For stronger protection on Vercel, add firewall or rate-limit rules for `/api/enquiry`.

## Before launch (from `OPEN_ITEMS.md`)

- [ ] Domain (not purchased yet): set `NEXT_PUBLIC_SITE_URL` once bought. Until then, canonical URLs and the sitemap use `http://localhost:3000`.
- [x] WhatsApp: `+20 10 5566 3884` (supplied 2026-11-20). It shows in the footer, as a WhatsApp button next to "Start your consultation", and as the main action on the Contact page, with a pre-filled greeting in the visitor's language.
- [ ] Optional: a public email and social URLs in `src/config/business.ts`. Phone calls are not shown separately; set `phone` to show them too.
- [ ] Approve all copy in three languages, then set `copyApproved: true`. This removes the banner and enables indexing.
- [ ] Approve the FAQ answers and service descriptions, and confirm the service format (online, in person or both).
- [ ] Get the Privacy Policy and Terms legally reviewed for Egypt and the Gulf, then set `legalReviewed: true` and `legalLastUpdated`.
- [ ] Choose an enquiry provider and sender identity, configure the env vars, and send a real test enquiry.
- [ ] Optional: testimonials, transformations and recipes, each with written consent and approval.
- [ ] Optional: analytics, after a privacy review. Never send form data to analytics.
- [ ] Check Arabic rendering on real iOS and Android devices.

## Deployment (Vercel)

1. Import the repository into Vercel. It is detected as a Next.js project with build command `npm run build`.
2. Set the environment variables from `.env.example` (`NEXT_PUBLIC_SITE_URL` plus the enquiry provider variables).
3. Deploy a preview and review all three locales on mobile and desktop.
4. Once the content is approved, flip the flags in `src/config/content.ts`, connect the domain and promote to production.
5. Roll back by re-promoting a previous deployment.

Run locally:

```bash
npm install
npm run dev
npm run check      # typecheck, lint, unit tests, build
npm run test:e2e   # after build
```
