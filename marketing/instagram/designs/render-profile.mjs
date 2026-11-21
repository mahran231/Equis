// Renders the profile avatar and story-highlight covers.
// Usage: node marketing/instagram/designs/render-profile.mjs
import { readFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright");
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "export", "profile");
mkdirSync(out, { recursive: true });
const img = (f) => `data:image/png;base64,${readFileSync(join(root, "assets", f)).toString("base64")}`;
const stroke = `fill="none" stroke="#F6F1E7" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"`;
const icons = {
  "01-start": `<img src="${img("symbol-cream.png")}" style="width:300px">`,
  "02-services": `<svg width="320" height="320" viewBox="0 0 320 320" ${stroke}><rect x="20" y="20" width="120" height="120" rx="28"/><rect x="180" y="20" width="120" height="120" rx="28"/><rect x="20" y="180" width="120" height="120" rx="28"/><rect x="180" y="180" width="120" height="120" rx="28"/></svg>`,
  "03-how-it-works": `<svg width="320" height="320" viewBox="0 0 320 320" ${stroke}><path d="M20 280h90v-80h90v-80h100"/><circle cx="290" cy="60" r="20" fill="#A9684A" stroke="none"/></svg>`,
  "04-faq": `<svg width="320" height="320" viewBox="0 0 320 320" ${stroke}><path d="M110 115a50 50 0 1 1 72 45c-14 7-22 18-22 34v16"/><circle cx="160" cy="268" r="14" fill="#F6F1E7" stroke="none"/></svg>`,
  "05-food": `<svg width="320" height="320" viewBox="0 0 320 320" ${stroke}><path d="M30 150h260a130 130 0 0 1-260 0z"/><path d="M120 110c0-30 30-30 30-60M180 110c0-30 30-30 30-60"/></svg>`,
};
const page = await (await chromium.launch()).newPage({ viewport: { width: 1080, height: 1080 } });
await page.setContent(`<body style="margin:0;width:1080px;height:1080px;background:#F6F1E7;display:grid;place-items:center"><img src="${img("symbol-color.png")}" style="width:460px"></body>`);
await page.screenshot({ path: join(out, "avatar-1080.png") });
await page.setViewportSize({ width: 1080, height: 1920 });
for (const [name, icon] of Object.entries(icons)) {
  await page.setContent(`<body style="margin:0;width:1080px;height:1920px;background:#183F35;display:grid;place-items:center">${icon}</body>`);
  await page.screenshot({ path: join(out, `highlight-${name}.png`) });
}
await page.context().browser().close();
console.log("✓ profile assets");
