# ACCEPTANCE TESTS — PUBLIC WEBSITE

## Scope
Confirm the product is only a public website. There must be no client/coach/admin portal, authentication, health-record database or coaching operations features.

## Pages and navigation
- [ ] Home, About, Services, How It Works, FAQ and Contact load.
- [ ] Transformations are hidden unless approved authentic assets and consent exist.
- [ ] Recipes/Resources are hidden until approved content exists.
- [ ] Privacy and Terms pages are present and not falsely represented as legally reviewed.
- [ ] Header/footer navigation works on desktop and mobile.
- [ ] No dead links or placeholder URLs are published.

## Localization
- [ ] Egyptian Arabic is the default locale and uses RTL throughout.
- [ ] English and French are LTR.
- [ ] All enabled pages have all three language versions.
- [ ] Language switcher preserves equivalent page where possible.
- [ ] Mixed Arabic/English phone, email and numeric content displays correctly.
- [ ] No horizontal overflow in RTL on common mobile widths.

## Brand
- [ ] Supplied logo symbol and wordmark are used without distortion.
- [ ] Brand colors match approved values.
- [ ] Manrope and Newsreader are used in the intended hierarchy.
- [ ] Arabic fallback font is readable and tested.
- [ ] Visual design is premium, minimal and consistent.

## Enquiry form
- [ ] Name is required.
- [ ] At least one of email or phone is required.
- [ ] Contact consent is required.
- [ ] Server-side validation rejects invalid payloads.
- [ ] Rate limiting/spam protection is enabled.
- [ ] Form does not collect health history, weight, height, measurements or progress photos.
- [ ] Success is shown only when the configured provider confirms acceptance.
- [ ] If no provider is configured, the fallback is clear and no false success is shown.
- [ ] Full form payloads are not written to logs or analytics.

## Content integrity
- [ ] No fake testimonials or reviews.
- [ ] No fabricated transformation photos or outcomes.
- [ ] No invented prices, guarantees, timelines or credentials.
- [ ] No invented contact details or social links.
- [ ] All unapproved copy remains draft/hidden.

## Quality
- [ ] Keyboard navigation works.
- [ ] Focus states are visible.
- [ ] Form labels and errors are accessible.
- [ ] Color contrast is checked.
- [ ] Loading, success, error and empty states are present.
- [ ] Images are optimized and layout shifts minimized.
- [ ] SEO metadata, sitemap, robots, canonical and hreflang are configured.
- [ ] Typecheck, lint, tests and production build pass.

## Explicit exclusions verification
- [ ] No login or signup pages.
- [ ] No client/coach/admin dashboards.
- [ ] No client onboarding database.
- [ ] No nutrition/training plan upload system.
- [ ] No check-in, measurement or progress-tracking tools.
- [ ] No private messaging.
- [ ] No payments or subscriptions.
