# EQUIS BY MAHRAN | Business requirements document

Version 1.0 • 23 November 2026 • Owner: Mahran Mohamed • Status: detailed build specification, not implementation approval or production acceptance

## 1. Purpose and success
Create an independent EQUIS website and web application for online nutrition and training coaching. Visitors understand the service and contact EQUIS. Enrolled clients see their complete weekly nutrition, resistance training and mobility plans, log activity, submit check-ins and private measurements, download plans and communicate with their coach. Coaches author and review plans, manage clients and follow progress without mixing client records.

Success is proven by end-to-end tests, not screen resemblance: a coach publishes a client-specific week; only that client and authorized coaching staff can read it; the client logs and uploads; the correct coach reviews; the PDF matches the same published version. No customer-count, revenue, weight-loss or uptime promises are invented. Establish conversion and retention baselines after consent-aware measurement exists. Operational metrics: failed uploads, failed PDFs, unreviewed submissions, delivery failures and authorization denials without sensitive payloads.

## 2. Scope and surfaces
**Public marketing website:** home, services/approach, packages, free recipe-book request, about, contact, FAQ, privacy and terms. Searchable public content only. Home may use Mahran's approved original photo. About does not reuse that photo unless separately approved. Existing website must not be replaced by this specification without release approval.

**Private coaching webapp:** authenticated client dashboard and coach workspace, full program authoring, food/training/mobility presentation, adherence/workout logging, progress, forms/uploads, chat, notifications, PDFs, plan history, freezes and end-of-program follow-up.

**Platform operations:** invitation/account lifecycle, access controls, audit, backups, restore and release procedures. No third-party operating-staff access by default.

Web-first is the recorded scope. Installable PWA and permission-based web push are required capabilities to implement and test, not a promise of identical device support. Native iOS/Android builds, stores and their fees are deferred. A single codebase may contain both surfaces, with private routes isolated from public indexing/caches. Hosting/domain are not selected or purchased here.

## 3. Roles
- Visitor: public pages and free-book request only. Cannot browse clients or discover account existence.
- Client: their own published plans, logs, submitted forms, measurements, private files, conversations, notifications and exports. No authority to alter a prescribed plan or another person's data.
- Coach: assigned clients only; drafts/publishes plans, reviews files, responds in chat and manages assigned programs. Cannot self-assign clients or promote roles.
- Owner/admin: Mahran's explicitly provisioned administrative identity; may invite coaches, assign clients and manage business configuration. This is an access boundary, not permission for every coach to see every client. Co-founder/partner is not granted access until Mahran explicitly authorizes the identity and role.
- Background worker: narrowly scoped jobs for PDFs/reminders/backups. Never a publicly callable admin endpoint.

## 4. Business and content rules
Brand name: EQUIS BY MAHRAN, with BY MAHRAN readable on mobile. Founder public copy: Mahran Mohamed. Public credentials line: NASM Certified Personal Trainer, Certified Nutritionist. No added licensure, guarantees, testimonials, badges or before/after photos without evidence and consent.

Audience: Egypt and Gulf, including KSA/UAE. Client-facing Arabic is Egyptian Arabic with RTL. Meal titles may be English; Arabic ingredients stay RTL. Training kits are English. English UI is supported with reviewed translations. French marketing parity is a launch decision, not permission to machine-publish unreviewed copy.

Coaching remains human-led. No automated diagnosis, prescription, exercise selection or calorie/meal generation is authorized. New-client workflow: 20–30 adaptive intake MCQs, skipping known answers; coaching analysis prepared and approved before final nutrition plan. Simple edits do not restart intake. Medical concerns trigger coach review and referral where needed, not automated diagnosis. Never copy an actual client's targets, measurements or restrictions into templates or another client's plan.

Nutrition design master: latest approved sanitized Rahma master, superseding the older Ahmed master instruction. Training design master: approved sanitized Abdo/Abdelrahman kit, distinct from nutrition. These are asset dependencies, not files included here. Public credentials and legacy PDF footer wording differ; obtain exact current PDF footer sign-off before final export. Keep data and layout separate so branding changes do not change prescription data.

## 5. Packages and entitlements
Recorded baseline, must be reconciled with owner-approved current copy before commercial launch:
- Fuel: 3 months, EGP 2,000; nutrition only, personal assessment, nutrition analysis, Egyptian-food plan, recipe book, review every 21 days and support within 12 hours on working days.
- Transform: 3 months, EGP 3,000; Fuel plus training guide, weekly follow-up, nutrition review every 21 days and monthly training update.
- Elite: 3 months, EGP 5,000; Transform plus flexible assessment, daily follow-up on working days, training review at least monthly/as needed, more frequent nutrition reviews as needed and priority replies within 12 hours.

Later Nov 22 wording wins over older conflicting Elite fixed two-week wording. Do not hardcode the old cadence. Working days recorded Sun–Thu. Support-window arithmetic, holidays and client timezones require explicit configuration and truthful display, not a fabricated response deadline.

Earlier recorded terms: Transform freeze up to 2 weeks, Elite up to 1 month, Fuel none; first plan 3–5 regular days after assessment/data complete; cancellation before plan delivery for full refund; upgrades within 10 days paying price difference. Installments and exact calendar-month interpretation need reconciliation before enabling entitlements or displaying binding terms. Default prototype uses manually assigned start/end dates and owner-entered freeze allowance. No automated charges, refunds, installment collection or renewals. Manual payments stay outside this app until separately scoped.

## 6. Public website content requirements
Retain original package captions exactly: Fuel: Know your numbers. Own your routine. Transform: Nutrition meets training. Elite: Guidance beyond the plan. Coaching kickers may be STRUCTURED COACHING / HIGH-TOUCH COACHING only where approved. No unsupported most-used badge.

Sections: concise hero with real credential line and action; services; method; three package cards; comparison; how enrollment/payment works; free book; FAQ; contact; about/footer. WhatsApp Business contact recorded as Egyptian local 01055663884. Confirm contact and manual payment instructions from approved business copy before live use; never publish personal payment details from assumptions. No nonexistent social links or demo form pretending to send a book.

Free-book workflow remains request-and-manual-send unless owner changes it. Request name/phone with explicit purpose and privacy notice; no automatic WhatsApp messaging. Recorded request-data deletion interval: 30 days. This does not define health-record retention.

## 7. Delivery and non-goals
Deliver source, migrations, RLS/storage policies, tests, asset manifest, environment template without secrets, deployment/rollback/runbooks, restore evidence, owner guide and traceability. No real-data migration from the paused project is assumed. No native stores, payment gateway, wearables, AI coach, public community, voice messages, automatic WhatsApp campaigns, coach marketplace or unapproved template feature.

No launch until security, content, privacy, device and operational gates pass. Missing assets may use labeled neutral placeholders in development only, never fake branded production content. This document is ready for implementation planning but not a claim that every business decision is settled.
