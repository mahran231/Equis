# EQUIS Nutrition: Instagram Kit (Month 1)

Everything needed to launch and run the EQUIS Instagram account for the first 30 days.
This is marketing content only. It sits beside the website and adds no code to it.

| File | What it is |
|---|---|
| `README.md` | Strategy, profile setup, posting rules, pre-publish checklist |
| `CALENDAR.md` | 30-day plan, one post a day, with Arabic + English captions and hashtags |
| `REELS.md` | 12 Reel scripts (hook, shots, on-screen text, voiceover, CTA) |
| `STORIES.md` | Daily story routine and ready-made story prompts |
| `export/*.png` | 9 ready-to-post designs (days 1–17 statics and carousels), 1080×1350 |
| `export/profile/` | Profile avatar + 5 highlight covers |
| `designs/` | Source copy (`posts.mjs`) and renderers. Edit text, then re-render |

Re-render after editing copy:

```bash
NODE_PATH=$(npm root -g) node marketing/instagram/designs/render.mjs
```

```bash
NODE_PATH=$(npm root -g) node marketing/instagram/designs/render-profile.mjs
```

---

## 1. Positioning on Instagram

**One line:** Personalized nutrition and training, built around your real routine.
**بالمصري:** تغذية وتمرين بخطة شخصية، مبنية على يومك الحقيقي.

The account should feel calm, structured and premium. It should not look like a loud gym page.
Discipline comes across as a routine you can return to, not as punishment.

### Content pillars

| # | Pillar | Share | Purpose |
|---|---|---|---|
| 1 | **Practical nutrition**: Egyptian and Gulf food, portions, eating out | 30% | Save-worthy value |
| 2 | **Training**: gym basics, busy schedules, progressive overload | 20% | Reach the gym audience |
| 3 | **Myth vs fact**: rice and bread, late eating, the scale, supplements | 15% | Shares and comments |
| 4 | **Discipline and mindset**: systems, consistency, restarting | 15% | Brand feel |
| 5 | **The EQUIS approach**: services, how it works, consultation | 20% | Conversion |

### Weekly rhythm (daily posting)

| Day | Format | Usual pillar |
|---|---|---|
| Sat | Carousel | Practical nutrition |
| Sun | Reel | Training / nutrition tip |
| Mon | Carousel | Myth vs fact |
| Tue | Reel | Busy-life tips |
| Wed | Single (quote) | Mindset |
| Thu | Reel / Carousel | The EQUIS approach |
| Fri | Single / Carousel | Light: food idea, weekly reset |

Stories run every day (see `STORIES.md`). Best posting windows to test for Egypt and the Gulf: **8–10 pm Cairo time**, plus a secondary test at **1–2 pm**. Check Insights after 2 weeks and adjust.

### Language

- Designs: Egyptian Arabic, with a small English line where it adds style.
- Captions: Egyptian Arabic first, then a short English version under `—` for Gulf and non-Arabic readers.
- Gym terms stay in English when that is how people say them (cardio, reps, recovery).

---

## 2. Profile setup

**Avatar:** `export/profile/avatar-1080.png` (full-colour symbol on cream, as in the brand guide).

**Name field** (searchable): `EQUIS Nutrition | تغذية وتمرين`

**Username:** to be confirmed by Dr. Mahran. The brand guide shows `@equisnutrition` as an *illustrative* handle only. Check availability before committing.

**Bio** (pick one, max 150 characters):

Option A, bilingual:
```
Personalized nutrition + training 🌿
خطة على مقاس يومك. مش رجيم مؤقت.
Egypt & Gulf · Online coaching
⬇️ ابدأ استشارتك
```

Option B, Arabic only:
```
تغذية وتمرين بخطة شخصية
مبنية على هدفك ويومك الحقيقي
مصر والخليج · أونلاين
⬇️ ابدأ استشارتك
```

> ⚠️ "Online coaching" and "Egypt & Gulf" match the website brief. Confirm that online coaching is actually offered (it is an open FAQ item) before using the word.

**Link in bio:** the website `/contact` page once it is live. Until then, a WhatsApp link: `https://wa.me/201055663884` (number from `src/config/business.ts`).

**Contact button:** WhatsApp, using the same number.

**Highlights** (covers in `export/profile/`):

| Cover | Name | What goes in it |
|---|---|---|
| `highlight-01-start` | ابدأ هنا | Who EQUIS is for + how to start |
| `highlight-02-services` | الخدمات | The 4 coaching paths (day 3 slides) |
| `highlight-03-how-it-works` | إزاي بنشتغل | The 5 steps (day 5 slides) |
| `highlight-04-faq` | أسئلة | Approved FAQ answers only |
| `highlight-05-food` | أكل | Food ideas, protein sources, eating out |

---

## 3. Content rules (from the brand and integrity rules)

Never post:
- Testimonials, reviews, client names, client results or before/after photos, unless the client is real and has given **written permission to publish**
- Prices, guarantees, "lose X kg in Y weeks" or any specific timeline
- Medical claims, diagnoses or treatment promises
- Credentials, degrees or affiliations that Dr. Mahran has not confirmed
- AI-generated "clients", transformations or fake people
- Shame, fear or body-negative language ("قرف"، "كرش مقرف"، "اتكسف من جسمك")

Always:
- Use the supplied logo artwork. Never type the wordmark as text.
- Use brand colours only: Evergreen, Warm Cream, Clay (small accents), Sage, Warm Neutral. No gradients and no neon.
- Use real photos and videos (Dr. Mahran, real food, the real gym). Stock is fine for food and texture if it is licensed.
- Keep advice general. Individual numbers (calories, protein grams) are "set in your personal plan".

### Pre-publish checklist (every post)
- [ ] No invented claims, results, prices or timelines
- [ ] Nutrition or training statements approved by Dr. Mahran
- [ ] Arabic reads naturally and the English matches its meaning
- [ ] Logo is the supplied artwork, with clear space around it
- [ ] Contact details come from `business.ts` only
- [ ] Alt text added (Instagram → Advanced settings → Accessibility)
- [ ] One clear CTA: save, share, comment, or DM for a consultation

---

## 4. What to measure (weekly)

| Metric | Why |
|---|---|
| Saves + shares per post | Shows which value content works |
| Reel 3-second hold and average watch time | Shows whether hooks work |
| Profile visits → link taps / WhatsApp taps | Shows conversion intent |
| DMs that say "استشارة" / "consultation" | Primary conversion signal |

Track the keyword **"استشارة"** in DMs. Several CTAs ask people to send that word, so you can count enquiries that came from Instagram.

---

## 5. Needs Dr. Mahran's input before posting

1. Final username, and whether the WhatsApp number is the public enquiry line.
2. Approval of every nutrition or training statement in `CALENDAR.md` and `REELS.md`.
3. Whether online coaching is offered and to which countries (affects bio and FAQ posts).
4. Filming the founder Reels (R1, R12). These need his real face and voice.
5. Real food or gym footage for Reels (phone video is fine).
