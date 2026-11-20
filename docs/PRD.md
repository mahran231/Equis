# PRODUCT REQUIREMENTS DOCUMENT
## EQUIS Public Website
Version 1.1 | Scope: Public marketing website only

## 1. Executive summary
EQUIS is a premium nutrition and training coaching brand serving Egypt and Gulf markets. The public website introduces the brand, explains its services and approach, provides useful approved resources, and converts suitable visitors into consultation enquiries.

This release is a marketing website only. It is not a client coaching platform or operational management system.

## 2. Objectives
- Establish a credible, premium digital presence for EQUIS.
- Explain the brand promise and coaching philosophy clearly.
- Present available nutrition and training services.
- Build trust through approved brand information, FAQs and authentic evidence where available.
- Generate qualified consultation enquiries.
- Work smoothly in Egyptian Arabic, English and French.

## 3. Explicit non-goals
The following are not part of this release:
- Client/coach/admin portals or dashboards.
- Authentication, accounts or user roles.
- Client onboarding/intake records.
- Client nutrition or training plan delivery.
- Check-ins, progress tracking, measurements or body-composition records.
- Private messaging or coaching communication tools.
- Health data, progress photo uploads or client file storage.
- Payments, subscriptions or invoices.
- CRM, scheduling system or coaching operations backend.
- Native mobile applications.

These may be considered later as a separate product, but must not be built now.

## 4. Audience and positioning
### Markets
Egypt and Gulf countries.

### Priority audience
- Busy professionals.
- Gym-focused clients.
- People pursuing fat loss, muscle gain or body recomposition.

### Positioning
EQUIS helps people achieve their body-shape goals through discipline, realistic nutrition and gym-aligned lifestyle support.

### Brand principles
- Sustainable fat loss.
- Muscle retention.
- Gym performance.
- Adherence and practical food choices.
- Hydration, sleep and recovery.
- Consistent progress tracking as part of coaching philosophy, without building tracking software on this website.

## 5. Sitemap
1. Home
2. About EQUIS
3. Services
4. How It Works
5. Transformations (conditional; publish only with approved authentic content and explicit consent)
6. EQUIS Recipes / Resources (conditional; publish only when content is ready)
7. FAQ
8. Contact / Consultation
9. Privacy Policy
10. Terms of Use

## 6. Home page structure
1. Header with supplied logo, navigation, language switcher and consultation CTA.
2. Hero section with clear body-shape/lifestyle proposition.
3. Brand promise: discipline, realistic nutrition and gym-aligned support.
4. Services overview.
5. How it works: Enquiry → Assessment → Personalized Coaching → Ongoing Review (describe the service, do not build portal functionality).
6. Coaching principles and differentiators.
7. Approved transformations/testimonials only if real content and permissions exist.
8. FAQ preview.
9. Final consultation CTA.
10. Footer with configured contact/social/legal links.

## 7. Service pages/sections
- Fat-loss coaching.
- Muscle-gain coaching.
- Body-recomposition coaching.
- Nutrition and training coaching.

Describe scope accurately. Do not promise guaranteed outcomes or fixed deadlines. Service descriptions must be editable and approved before publication.

## 8. About page
Explain EQUIS's purpose, philosophy and approach. Founder biography and credentials must use only facts explicitly supplied and approved by the owner. Do not add medical qualifications, licenses or degrees by inference.

## 9. How It Works
Explain the customer-facing service journey:
1. Submit a consultation enquiry.
2. Discuss goals and suitability.
3. Complete the appropriate assessment directly through the coaching service.
4. Receive an individualized coaching approach.
5. Review progress and make adjustments as part of the service.

Do not create digital client onboarding forms or tracking workflows in this release.

## 10. Transformations
This page/section is disabled by default. Enable only when:
- Actual client assets are supplied.
- The exact image/story has explicit publication consent.
- Claims and captions are verified.
- No fabricated or AI-generated client transformations are used.

## 11. Recipes / Resources
Optional content section. Can be hidden until approved recipes/resources are supplied. Do not invent nutrition facts or recipes and present them as EQUIS-approved.

## 12. FAQ
Provide editable FAQ entries. Suggested topics:
- Who is EQUIS for?
- Can I join with a busy work schedule?
- Do I need a gym membership?
- Is nutrition coaching personalized?
- Can meal choices include Egyptian foods?
- Do you offer online coaching?
- What happens after I submit a consultation enquiry?
Answers remain draft until approved.

## 13. Contact / Consultation form
Fields:
- Name (required)
- Email (optional)
- Phone/WhatsApp (optional, but at least one of email or phone is required)
- Country (optional)
- Main goal (optional)
- Preferred contact method
- Short message (optional)
- Consent to be contacted (required)

Do not ask for medical conditions, medications, allergies, weight, height, body measurements, progress photos or other sensitive health information on this public form.

On submit:
- Validate in browser and on server.
- Apply spam/rate limiting.
- Send/store through a configured provider.
- Show success only after provider confirms acceptance.
- If no provider is configured, show a clear alternative contact path and do not pretend the enquiry was delivered.

## 14. Localization
- Default locale: Egyptian Arabic (`ar-EG`) and RTL.
- Additional locales: English (`en`) and French (`fr`).
- Every main page and navigation item has all three translations.
- Use natural Egyptian Arabic for brand-facing conversational copy.
- Use professional Arabic for privacy/terms.
- Preserve page context when switching locale.
- Ensure correct direction for mixed-language text, phone numbers and email addresses.

## 15. Design
Follow `BRAND_SYSTEM.md` and the supplied brand identity assets. The website should feel premium, minimal, editorial and approachable. Do not turn the nutrition-plan PDF layout into a literal website layout; carry over its brand palette, typography and visual discipline.

## 16. SEO and performance
- Per-page localized metadata.
- Canonical and hreflang tags.
- XML sitemap and robots.txt.
- Open Graph/social preview images.
- Semantic heading structure.
- Optimized image formats and responsive sizes.
- Lazy-load below-the-fold imagery.
- Avoid unnecessary client-side JavaScript.
- Aim for strong Core Web Vitals.

## 17. Success metrics
- Qualified consultation enquiries.
- Enquiry conversion rate.
- CTA engagement.
- Visits to services and how-it-works pages.
- Resource/recipe engagement if enabled.
- Performance and accessibility scores.

Do not send health data or form content to analytics.
