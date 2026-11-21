// Renders every slide in posts.mjs to 1080×1350 PNG (Instagram 4:5).
// Usage: node marketing/instagram/designs/render.mjs [postId]
import { readFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { posts } from "./posts.mjs";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const outDir = join(root, "export");
const asset = (f) => `data:image/png;base64,${readFileSync(join(root, "assets", f)).toString("base64")}`;
const LOGO = {
  symbolColor: asset("symbol-color.png"),
  symbolCream: asset("symbol-cream.png"),
  wordmarkColor: asset("wordmark-color.png"),
  wordmarkCream: asset("wordmark-cream.png"),
};

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>");

const css = `
:root{--green:#183F35;--cream:#F6F1E7;--clay:#A9684A;--sage:#9CA995;--neutral:#D9D2C6}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1080px;height:1350px}
body{font-family:"Noto Sans Arabic","Manrope",sans-serif;-webkit-font-smoothing:antialiased}
.slide{width:1080px;height:1350px;padding:96px 96px 88px;display:flex;flex-direction:column;position:relative;overflow:hidden}
.cream{background:var(--cream);color:var(--green)}
.green{background:var(--green);color:var(--cream)}
.top{display:flex;justify-content:space-between;align-items:center;height:72px}
.top img{height:72px}
.count{font-family:Manrope;font-weight:500;font-size:26px;letter-spacing:.08em;direction:ltr;opacity:.7}
.main{flex:1;display:flex;flex-direction:column;justify-content:center}
.kicker{font-family:Manrope,"Noto Sans Arabic";font-weight:600;font-size:30px;letter-spacing:.12em;text-transform:uppercase;color:var(--clay);margin-bottom:40px}
.green .kicker{color:var(--sage)}
h1{font-family:"Noto Naskh Arabic",serif;font-weight:600;font-size:100px;line-height:1.45}
h2{font-family:"Noto Naskh Arabic",serif;font-weight:600;font-size:84px;line-height:1.4;margin-bottom:36px}
p.body{font-size:44px;line-height:1.75;font-weight:400;max-width:860px}
.cover p.body{margin-top:44px;opacity:.85}
.num{font-family:Newsreader,serif;font-weight:400;font-size:150px;line-height:1;color:var(--sage);margin-bottom:40px;direction:ltr;text-align:right}
.rule{width:96px;height:6px;border-radius:3px;background:var(--clay);margin-bottom:48px}
.bottom{display:flex;justify-content:space-between;align-items:flex-end;min-height:56px}
.swipe{font-size:32px;font-weight:600;color:var(--clay);display:flex;gap:16px;align-items:center}
.swipe i{display:inline-block;width:72px;height:4px;background:var(--clay);border-radius:2px}
ul{list-style:none;border-top:2px solid var(--neutral)}
li{font-size:46px;font-weight:500;padding:18px 0;border-bottom:2px solid var(--neutral);display:flex;gap:28px;align-items:center}
li::before{content:"";width:14px;height:14px;border-radius:50%;background:var(--clay);flex:none}
.note{font-size:36px;line-height:1.7;margin-top:44px;opacity:.8}
.quote h1{font-size:88px}
.en{font-family:Newsreader,serif;font-style:italic;font-size:44px;color:var(--sage);margin-top:48px;direction:ltr;text-align:right}
.wordmark{height:120px;align-self:flex-start}
.wa{display:inline-flex;align-items:center;gap:24px;margin-top:64px;border:2px solid var(--sage);border-radius:14px;padding:26px 36px;font-size:36px;font-weight:500;align-self:flex-start}
.wa bdi{font-family:Manrope;font-weight:600;letter-spacing:.02em}
`;

function top(slide, i, total, theme) {
  const sym = theme === "green" ? LOGO.symbolCream : LOGO.symbolColor;
  const count = total > 1 ? `<span class="count">${String(i + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}</span>` : "<span></span>";
  return `<div class="top"><img src="${sym}" alt="">${count}</div>`;
}

function body(slide) {
  switch (slide.type) {
    case "cover":
      return `<div class="main cover">${slide.kicker ? `<div class="kicker">${esc(slide.kicker)}</div>` : ""}<h1>${esc(slide.title)}</h1>${slide.body ? `<p class="body">${esc(slide.body)}</p>` : ""}</div>`;
    case "point":
      return `<div class="main"><div class="num">${esc(slide.n)}</div><div class="rule"></div><h2>${esc(slide.title)}</h2><p class="body">${esc(slide.body)}</p></div>`;
    case "list":
      return `<div class="main"><h2>${esc(slide.title)}</h2><ul>${slide.items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>${slide.note ? `<p class="note">${esc(slide.note)}</p>` : ""}</div>`;
    case "quote":
      return `<div class="main quote"><h1>${esc(slide.title)}</h1>${slide.body ? `<p class="body" style="margin-top:48px;opacity:.85">${esc(slide.body)}</p>` : ""}${slide.en ? `<div class="en">${esc(slide.en)}</div>` : ""}</div>`;
    case "cta":
      return `<div class="main"><div class="rule"></div><h1>${esc(slide.title)}</h1><p class="body" style="margin-top:40px;opacity:.9">${esc(slide.body)}</p>${slide.whatsapp ? `<div class="wa">واتساب <bdi dir="ltr">${esc(slide.whatsapp)}</bdi></div>` : ""}</div>`;
  }
  throw new Error(`Unknown slide type ${slide.type}`);
}

function bottom(slide, i, total, theme) {
  const showWordmark = slide.showWordmark;
  const wm = theme === "green" ? LOGO.wordmarkCream : LOGO.wordmarkColor;
  const left = showWordmark ? `<img class="wordmark" src="${wm}" alt="EQUIS Nutrition">` : "<span></span>";
  const swipe = total > 1 && i < total - 1 ? `<span class="swipe">اسحب <i></i></span>` : "<span></span>";
  return `<div class="bottom">${swipe}${left}</div>`;
}

function html(slide, i, total) {
  const theme = slide.theme ?? "cream";
  return `<!doctype html><html lang="ar-EG" dir="rtl"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Newsreader:ital,wght@0,400;0,500;1,400&family=Noto+Naskh+Arabic:wght@500;600;700&family=Noto+Sans+Arabic:wght@400;500;600;700&display=block" rel="stylesheet">
<style>${css}</style></head><body><div class="slide ${theme}">${top(slide, i, total, theme)}${body(slide)}${bottom(slide, i, total, theme)}</div></body></html>`;
}

const only = process.argv[2];
mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
for (const post of posts.filter((p) => !only || p.id === only)) {
  const total = post.slides.length;
  for (const [i, slide] of post.slides.entries()) {
    await page.setContent(html(slide, i, total), { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    const overflow = await page.evaluate(() => {
      const s = document.querySelector(".slide");
      return s.scrollHeight > s.clientHeight || s.scrollWidth > s.clientWidth;
    });
    if (overflow) console.warn(`⚠ overflow: ${post.id} slide ${i + 1}`);
    const file = join(outDir, `${post.id}${total > 1 ? `-${String(i + 1).padStart(2, "0")}` : ""}.png`);
    await page.screenshot({ path: file });
  }
  console.log(`✓ ${post.id} (${total})`);
}
await browser.close();
