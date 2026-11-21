// Source copy for the designed Instagram posts (first 9 grid posts).
// Edit text here, then run: node marketing/instagram/designs/render.mjs
// Slide types: cover | point | list | quote | cta
// theme: "cream" (default) | "green"

const WHATSAPP = "+20 10 5566 3884"; // from src/config/business.ts

const cta = (line) => ({
  type: "cta",
  theme: "green",
  title: "ابدأ استشارتك",
  body: line ?? "ابعتلنا رسالة، ونشوف سوا الخطة المناسبة ليك.",
  whatsapp: WHATSAPP,
});

export const posts = [
  {
    id: "day01-brand-intro",
    day: 1,
    slides: [
      {
        type: "quote",
        theme: "green",
        showWordmark: true,
        title: "الانضباط…\nمعمول على مقاسك.",
        body: "تغذية وتمرين بخطة شخصية، مبنية على يومك الحقيقي.",
      },
    ],
  },
  {
    id: "day03-services",
    day: 3,
    slides: [
      {
        type: "cover",
        kicker: "EQUIS Nutrition",
        title: "بنساعدك في إيه؟",
        body: "٤ مسارات… وخطة واحدة على مقاسك.",
      },
      { type: "point", n: "01", title: "خسارة دهون", body: "أكل عملي وتمرين يحافظ على عضلك، بتقدّم تقدر تكمّل عليه." },
      { type: "point", n: "02", title: "بناء عضل", body: "أكل وتمرين يدعموا التمرين التصاعدي والريكفري." },
      { type: "point", n: "03", title: "إعادة تشكيل الجسم", body: "تحسين تكوين جسمك مع الوقت: دهون أقل، وعضل أكتر." },
      { type: "point", n: "04", title: "تغذية + تمرين", body: "نظام واحد مترابط، بدل خطتين مش شبه بعض." },
      cta(),
    ],
  },
  {
    id: "day05-how-it-works",
    day: 5,
    slides: [
      { type: "cover", kicker: "How it works", title: "إزاي بنشتغل؟", body: "٥ خطوات واضحة من أول رسالة." },
      { type: "point", n: "01", title: "قولّنا هدفك", body: "خسارة دهون، بناء عضل، أو إعادة تشكيل." },
      { type: "point", n: "02", title: "نتكلم سوا", body: "عن احتياجك، ونتأكد إن EQUIS مناسبة ليك." },
      { type: "point", n: "03", title: "التقييم", body: "تقييم مناسب كجزء من خدمة الكوتشينج." },
      { type: "point", n: "04", title: "خطتك الشخصية", body: "خطة أكل و/أو تمرين معمولة على هدفك ومواعيدك." },
      { type: "point", n: "05", title: "نراجع ونعدّل", body: "بنتابع تقدمك مع الكوتش ونعدّل حسب اللي بيحصل فعلاً." },
      cta(),
    ],
  },
  {
    id: "day07-myth-rice-bread",
    day: 7,
    slides: [
      { type: "cover", kicker: "خرافة ولا حقيقة؟", title: "لازم أبطّل رز وعيش\nعشان أخس؟" },
      { type: "point", n: "01", title: "مش شرط.", body: "اللي بيفرق في خسارة الدهون هو مجموع أكلك على مدار الأيام، مش صنف واحد بعينه." },
      { type: "point", n: "02", title: "بكمية محسوبة", body: "الرز والعيش ممكن يبقوا جزء من خطتك، جنب بروتين وخضار." },
      { type: "point", n: "03", title: "الأهم إنك تكمّل", body: "الخطة اللي تقدر تمشي عليها أحسن من خطة مثالية هتسيبها بعد أسبوع." },
      cta("عايز خطة فيها أكلك اللي بتحبه؟ ابعتلنا."),
    ],
  },
  {
    id: "day09-protein-sources",
    day: 9,
    slides: [
      { type: "cover", kicker: "من مطبخنا", title: "مصادر بروتين\nموجودة في بيتك" },
      {
        type: "list",
        title: "حيواني",
        items: ["بيض", "فراخ", "تونة وسمك", "لحمة قليلة الدهن", "جبنة قريش", "زبادي يوناني"],
      },
      {
        type: "list",
        title: "نباتي",
        items: ["عدس", "فول", "حمص", "فاصوليا"],
        note: "دول فيهم بروتين وكربوهيدرات مع بعض، فبيتحسبوا كده في الخطة.",
      },
      { type: "point", n: "✓", title: "وزّعه على يومك", body: "بروتين في كل وجبة أسهل من إنك تحاول تجيبه كله في وجبة واحدة." },
      cta("كمية البروتين المناسبة ليك بتتحدد حسب هدفك وتمرينك. ابعتلنا."),
    ],
  },
  {
    id: "day11-quote-system",
    day: 11,
    slides: [
      {
        type: "quote",
        theme: "green",
        title: "مش محتاج حماس كل يوم.\nمحتاج نظام\nتقدر ترجعله.",
        en: "Return to the routine. Keep moving.",
      },
    ],
  },
  {
    id: "day13-busy-schedule",
    day: 13,
    slides: [
      { type: "cover", kicker: "للناس المشغولة", title: "يومك زحمة؟\nكده تمشي على الخطة" },
      { type: "point", n: "01", title: "جهّز مرة… كُل كذا يوم", body: "اطبخ البروتين مرة أو مرتين في الأسبوع." },
      { type: "point", n: "02", title: "فطار ثابت", body: "اختار ٢–٣ فطارات سهلة وكرّرهم. قرارات أقل = التزام أكتر." },
      { type: "point", n: "03", title: "٣ تمرينات قوية", body: "أحسن من ٦ في الجدول مش هتلحقهم." },
      { type: "point", n: "04", title: "اليوم باظ؟ عادي", body: "الوجبة الجاية هي البداية الجديدة… مش يوم السبت." },
      cta(),
    ],
  },
  {
    id: "day15-scale",
    day: 15,
    slides: [
      { type: "cover", kicker: "الميزان", title: "الوزن زاد النهارده…\nيبقى أنا بفشل؟" },
      { type: "point", n: "01", title: "طبيعي يتغير", body: "الوزن بيتحرك يوميًا بسبب المية، الملح، الأكل اللي لسه في جسمك، النوم والضغط." },
      { type: "point", n: "02", title: "بص على الاتجاه", body: "المتوسط على كام أسبوع أصدق من رقم يوم واحد." },
      { type: "point", n: "03", title: "نفس الظروف", body: "اوزن نفسك الصبح، بعد الحمام، وقبل الأكل." },
      { type: "point", n: "04", title: "مش المقياس الوحيد", body: "مقاس هدومك وأداءك في الجيم بيحكوا جزء مهم من القصة." },
      cta(),
    ],
  },
  {
    id: "day17-consultation",
    day: 17,
    slides: [
      {
        type: "cta",
        theme: "green",
        showWordmark: true,
        title: "جاهز تبدأ؟",
        body: "ابدأ استشارتك. احكيلنا عن هدفك ويومك، ونشوف سوا الخطة المناسبة ليك.",
        whatsapp: WHATSAPP,
      },
    ],
  },
];
