# CLAUDE CODE MASTER INSTRUCTIONS — EQUIS PUBLIC WEBSITE

You are implementing the public marketing website for EQUIS. The current scope is strictly the public website. Do not build a coaching platform.

## 1. Scope boundary — mandatory
Build a public-facing website that introduces EQUIS, explains services, communicates the brand approach, answers common questions, and generates consultation enquiries.

Explicitly out of scope:
- Client, coach or admin dashboards
- Client login, authentication or role management
- Client onboarding records or intake questionnaires
- Nutrition or training plan uploads/management
- Check-ins, body measurements, progress charts or client histories
- Private messaging
- Health records, medical information or progress-photo storage
- Payments, subscriptions or invoices
- CRM or coaching operations system

Do not create database tables, Supabase configuration, private storage buckets, RLS policies or authentication flows for these excluded features. If the owner later wants a coaching platform, treat it as a separate future project.

## 2. Product purpose
EQUIS is a premium nutrition and training coaching brand founded and led by Dr. Mahran Mohamed. The website should communicate that EQUIS helps people work toward their body-shape goals through discipline, realistic nutrition and gym-aligned lifestyle support.

Target markets:
- Egypt and Gulf countries.

Priority audiences:
- Busy professionals
- Gym-focused clients
- People seeking fat loss, muscle gain or body recomposition

Primary conversion:
- Consultation enquiry.

Secondary conversions:
- WhatsApp/contact click (only when a real number is configured)
- Social profile visits (only when real URLs are configured)
- Resource/recipe engagement if that section is enabled

## 3. Required pages
- Home
- About EQUIS
- Services
- How It Works
- Transformations (only if real assets and explicit publication permission are supplied)
- EQUIS Recipes / Resources (can remain disabled until approved content exists)
- FAQ
- Contact / Consultation
- Privacy Policy
- Terms of Use

## 4. Recommended technology
- Next.js App Router
- TypeScript strict mode
- Tailwind CSS
- Accessible reusable components
- React Hook Form + Zod for form validation
- Vercel deployment

Use server components by default and client components only for interactions. Keep dependencies lean. Do not add Supabase, a database, authentication, CMS or payment provider by default. For the enquiry form, implement a provider-neutral server endpoint and a safe configurable delivery/storage adapter. If no provider is configured, show a clear fallback contact action and do not pretend the enquiry was delivered.

## 5. Localization
- Default: Egyptian Arabic (`ar-EG`), RTL.
- Additional languages: English (`en`) and French (`fr`).
- Every main public page must have all three locales.
- Use natural Egyptian Arabic for conversational brand copy and professional Arabic for legal/consent text.
- Use correct `dir="rtl"` for Arabic and `dir="ltr"` for English/French.
- Ensure mixed Arabic/English numbers, phone numbers, email addresses and URLs display correctly.
- Persist locale preference and preserve equivalent page when switching languages.

## 6. Brand rules
- Evergreen: `#183F35`
- Warm Cream: `#F6F1E7`
- Clay: `#A9684A`
- Sage: `#9CA995`
- Warm Neutral: `#D9D2C6`
- UI/body: Manrope
- Editorial headings: Newsreader
- Arabic fallback: Noto Sans Arabic or another legible licensed Arabic family.
- Use the supplied logo symbol and wordmark as artwork. Never recreate the wordmark by typing "EQUIS".
- Preserve logo proportions and clear space.
- Premium, minimal, warm, editorial and structured.
- Generous whitespace, clear hierarchy, restrained accents.
- No gradients, neon colors, generic bodybuilding template visuals, heavy shadows or decorative clutter.
- Do not use AI-generated fake client transformations or fake testimonials.

## 7. Content integrity
Never invent:
- Testimonials or reviews
- Client names, before/after photos or outcomes
- Prices, guarantees or specific weight-loss timelines
- Clinical diagnoses or treatment claims
- Credentials, degrees, licenses or professional affiliations
- Address, phone, WhatsApp, email or social URLs

Use editable placeholders in `src/config/business.ts`. Hide sections with missing approved content or mark them as unpublished in the content config.

## 8. Privacy and forms
The public enquiry form should collect only what is needed to respond:
- Name
- Email or phone/WhatsApp (at least one)
- Country
- Main goal (optional)
- Preferred contact method
- Short message (optional)
- Consent to be contacted

Do not collect medical history, allergies, medications, body measurements, progress photos or other sensitive health data through the public website form.

Validate server-side with Zod. Add spam prevention/rate limiting. Never log full form payloads. Do not claim an enquiry has been sent unless a configured provider confirms delivery/storage.

## 9. Quality requirements
- Mobile-first responsive layouts.
- Accessible semantic HTML and keyboard navigation.
- Visible focus states and correctly labelled form fields.
- WCAG 2.2 AA-minded contrast.
- Loading, validation, success and failure states.
- SEO metadata, sitemap, robots.txt, Open Graph and canonical URLs.
- Optimize images and fonts; avoid layout shifts.
- No horizontal overflow in Arabic RTL.
- No fabricated content or broken placeholder links.

## 10. Workflow
1. Inspect the repository and existing assets.
2. Create a task checklist from `docs/IMPLEMENTATION_PLAN.md`.
3. Implement the public website only.
4. Run typecheck, lint, tests and build.
5. Review mobile, desktop, Arabic RTL, English and French.
6. Run all acceptance checks.
7. Write `docs/BUILD_REPORT.md` listing completed pages, tests, deployment steps and remaining content configuration.

## 11. Definition of done
The public site works across all required locales, all links and forms behave honestly, no excluded coaching-platform features exist, and no unapproved business claims or client content are published.
