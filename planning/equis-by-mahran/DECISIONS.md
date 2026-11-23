# DECISIONS.md — EQUIS BY MAHRAN decision register

Created 2026-11-23 (Phase 0, planning). Every decision records: answer, date, who decided, impacted requirement IDs.
Categories:
- **BUILD** — genuinely blocks starting implementation.
- **PHASE** — blocks acceptance of one phase/feature; engineering continues with labelled TEST placeholders.
- **LAUNCH** — blocks commercial/public release of the affected part only.
- **RECORDED** — already decided by the owner; do not reopen.
- **TECH** — developer decision (owner not asked).

## A. Recorded owner decisions (do not reopen)
| ID | Decision | Source | Affects |
|---|---|---|---|
| R-01 | Brand name "EQUIS BY MAHRAN"; "BY MAHRAN" readable on mobile | Owner prompt §1 | WEB-01, SYS-06 |
| R-02 | Public credentials line: "NASM Certified Personal Trainer, Certified Nutritionist". No other titles/badges/ratings/before-after | Owner prompt §1 | WEB-01, CLI-10 |
| R-03 | Fully human coaching; no automated diagnosis/prescription/meal/exercise generation | §1 | COA-02, COA-03 |
| R-04 | Markets Egypt + Gulf (KSA/UAE). Arabic Egyptian RTL first + reviewed English. Meal titles may be English, ingredients Arabic; training guides English. French = separate launch decision, never publish unreviewed | §1 | SYS-03, SYS-06 |
| R-05 | Web-first PWA, optional web push with consent; no native apps/stores; no payment gateway; no automated WhatsApp | §2 | all |
| R-06 | Packages exactly: Fuel 3 mo EGP 2,000 "Know your numbers. Own your routine."; Transform 3 mo EGP 3,000 "Nutrition meets training."; Elite 3 mo EGP 5,000 "Guidance beyond the plan." with the listed inclusions | §3 | WEB-02 |
| R-07 | First plan within 3–5 calendar days after assessment + data complete; cancellation before plan delivery = full refund; upgrade within 10 days paying difference; freeze Fuel none / Transform ≤ 2 weeks / Elite ≤ 1 month | §3 | WEB-02, COA-07 |
| R-08 | Working days Sun–Thu for support/follow-up; NOT applied to first-plan delivery window | §3 | WEB-02, CLI-08 |
| R-09 | Payment manual, outside the app | §3 | WEB-02 |
| R-10 | WhatsApp Business 01055663884 (Egypt) → displayed/linked as +20 10 5566 3884 | §4 | WEB-01 |
| R-11 | Free book: name + phone with country code + purpose notice + explicit consent; success = "request recorded"; manual delivery by owner; requests deleted after 30 days | §4 | WEB-03, SYS-05 |
| R-12 | Invitation-only accounts; no self-registration or public role choice; owner = Mahran's explicitly provisioned identity; partner has no access without explicit authorization | §5 | ACC-01/02 |
| R-13 | Adherence: show counts and N/A, no percentage until the formula is approved | §8 | SYS-02, CLI-01 |
| R-14 | Hero may use Mahran's approved photo; About must not reuse it without separate approval | §4 | WEB-01 |
| R-15 | Current EQUIS website colour experiments are NOT the app style | §8 | SYS-06 |
| R-16 | Technical choices belong to the developer | §9 | — |

## B. BUILD-blocking (must be answered before code starts)
| ID | Question | Why it blocks | Recommendation |
|---|---|---|---|
| D-01 | **Where should the new codebase live?** Repo `mahran231/Equis` is the existing public site; its `CLAUDE.md` forbids Supabase/auth/dashboards here and says a coaching platform is a separate project. | Building here would violate the repo's own rules and risk the existing site/deployment. I cannot create GitHub repos from this session. | Owner creates a new empty repo (e.g. `equis-by-mahran`) and adds it to this session. Alternative: an isolated `apps/equis-by-mahran/` folder in this repo with its own CLAUDE.md — only if you explicitly authorise overriding the root CLAUDE.md for that folder. |
| D-02 | Explicit "ابدأ" after reviewing this plan | Owner gate G-START | — |

## C. PHASE-blocking (engineering proceeds with TEST placeholders)
| ID | Item | Blocks acceptance of | Impacted IDs |
|---|---|---|---|
| D-05 | **Brand identity for EQUIS BY MAHRAN** (symbol, wordmark incl. "BY MAHRAN", colours, licensed fonts). The repo contains an "EQUIS NUTRITION" identity (Sept 2026, Evergreen #183F35 / Cream #F6F1E7 / Clay #A9684A, Newsreader + Manrope). Is that identity approved as the base for EQUIS BY MAHRAN, or will a new one be supplied? | Final UI/public pages, PDFs | WEB-01, SYS-06, CLI-10 |
| D-06 | Mahran's approved photo + crop permission | Hero acceptance | WEB-01 |
| D-07 | Sanitized nutrition master (Rahma) and training master (Abdo/Abdelrahman) | PDF visual fidelity | CLI-10, COA-08 |
| D-08 | Six approved exercise libraries (strength/warm-up/mobility × male/female) with stable codes, text, owned illustrations | Real training authoring | CLI-04, COA-02, COA-06 |
| D-09 | Recipes + recipe book (ingredients g, raw/cooked, portions, macros + source, licensed images) and the free-book file | Real meal display; free-book fulfilment | CLI-03, COA-06, WEB-03 |
| D-10 | Approved intake question set (20–30 adaptive MCQs) and check-in fields/cadence — or authorisation for me to draft them for your review (marked DRAFT, never shown to real clients before approval) | Intake/check-in acceptance | CLI-06, COA-03 |
| D-11 | Physical iPhone (iOS ≥ 16.4) available for push/download/upload tests | Notification + upload + PDF device acceptance | CLI-07, CLI-09, CLI-10 |
| D-12 | Hosted staging (provider, region, cost) — presented by me for approval before Phase هـ | Push, restore rehearsal | SYS-04, CLI-09 |

## D. LAUNCH-blocking (asked now, may stay pending)
| ID | Item | Impacted IDs |
|---|---|---|
| L-01 | Launch together or staged (public site first, app later)? Does the new public site eventually **replace** the current EQUIS site/domain? | WEB-01, release |
| L-02 | Name/title conflict: existing site and docs say "Dr. Mahran Mohamed"; new rule bans added titles and public name is "Mahran Mohamed". Confirm "Dr." is dropped everywhere in the new product. | WEB-01, CLI-10 |
| L-03 | Credential validity: `docs/reference/EQUIS_Master_Project_Instructions.md` lists NASM CPT with "date supplied 27/09/2026, expiry 26/09/2026" (inconsistent/possibly expired) and does not list "Certified Nutritionist". Confirm both credentials are current before they are published. | WEB-01, CLI-10 |
| L-04 | Are R-06 prices/inclusions final for **public** display now (BRD says reconcile with latest approved copy)? Any "STRUCTURED / HIGH-TOUCH COACHING" kickers approved? | WEB-02 |
| L-05 | Elite freeze "1 month" in days (e.g. 30, 31 or calendar month) | COA-07 |
| L-06 | Installments: offered or not; wording | WEB-02 |
| L-07 | Program end-date semantics for "3 months" (calendar months vs fixed days; manual start/end by owner meanwhile) | COA-07, SYS-02 |
| L-08 | Manual payment instructions text (methods, who receives) — never published from assumptions | WEB-02 |
| L-09 | Approved FAQ, privacy policy and terms (ar + en), privacy contact, legal entity name; legal review | WEB-01, SYS-05 |
| L-10 | Health-record retention/deletion period after program end (separate from 30-day lead purge) | SYS-05 |
| L-11 | Adults-only launch, or a minors workflow (guardian consent)? | ACC-01, CLI-06 |
| L-12 | Coach change: does the new coach see historical chat? (Safe default: new thread, old archived from new coach until owner permits) | CLI-08, COA-01 |
| L-13 | Owner login email (provided via local `.env.local`/secure setup, not chat) and whether any other coach or partner is authorised now | ACC-02 |
| L-14 | Adherence formula (spec proposal in 05 §Dates) — accept/modify; partial logs; past-plan republish; late corrections | SYS-02 |
| L-15 | Reminder defaults, quiet hours, default week start day (Sat/Sun/Mon) | CLI-09, CLI-02 |
| L-16 | Support reply window display: "within 12 hours on working days" — exact public wording; holidays handling | WEB-02, CLI-08 |
| L-17 | Exact current PDF footer/credentials text (older PDF wording differs) | CLI-10 |
| L-18 | Hosting/domain/data region, backup destination, RPO/RTO (proposed 24h/4h), incident owner, monthly budget | SYS-04 |
| L-19 | Public email / social links: none published until real ones are supplied | WEB-01 |

## E. Developer (TECH) decisions — recorded, not asked
See `PLAN.md` §4 ADR-1..13. Notable: proxied private downloads instead of signed URLs; French scaffolded but unpublished; adherence shows counts/N/A; chat thread-transfer safe default per L-12 until answered; freeze intervals half-open `[starts_on, resumes_on)`.

## F. Answers log
| Date | ID | Answer | Decided by |
|---|---|---|---|
| — | — | (none yet) | — |
