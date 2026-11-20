# PUBLIC WEBSITE ARCHITECTURE

## Application
One responsive Next.js App Router application.

## Suggested structure
```text
src/
  app/
    [locale]/
      (marketing)/
        page.tsx
        about/page.tsx
        services/page.tsx
        how-it-works/page.tsx
        transformations/page.tsx
        resources/page.tsx
        faq/page.tsx
        contact/page.tsx
        privacy/page.tsx
        terms/page.tsx
    api/
      enquiry/route.ts
  components/
    ui/
    marketing/
    forms/
    layout/
  config/
    site.ts
    business.ts
    content.ts
  lib/
    i18n/
    validation/
    spam/
  messages/
    ar-EG.json
    en.json
    fr.json
public/
  brand/
  images/
docs/
```

## Rendering
- Prefer static rendering for public content.
- Use server components by default.
- Use client components only for interactions such as mobile navigation, locale switcher and validated form feedback.
- Use server route handlers for enquiry submission.

## Enquiry delivery
Create a provider-neutral interface for enquiry delivery. Do not add a database or CRM by default.
- If an approved email/form provider is configured, send the validated enquiry there.
- If no provider is configured, disable the submit action or provide a truthful fallback contact CTA.
- Never return a fake success response.
- Do not log full enquiry payloads.

## Environment
Use `.env.example` with only required public-site variables and optional enquiry-provider configuration. No service-role key or Supabase variables are needed by default.

## Deployment
Deploy to Vercel or an equivalent Next.js host. Use preview deployments for review and production only after content and legal approval.
