import { expect, test } from "@playwright/test";

const locales = [
  { prefix: "/ar", lang: "ar-EG", dir: "rtl" },
  { prefix: "/en", lang: "en", dir: "ltr" },
  { prefix: "/fr", lang: "fr", dir: "ltr" },
];
const paths = ["", "/about", "/services", "/how-it-works", "/faq", "/contact", "/privacy", "/terms"];

for (const { prefix, lang, dir } of locales) {
  test.describe(`${lang} pages`, () => {
    for (const path of paths) {
      test(`${prefix}${path || "/"} renders correctly`, async ({ page }) => {
        const res = await page.goto(`${prefix}${path}`);
        expect(res?.status()).toBe(200);
        await expect(page.locator("html")).toHaveAttribute("lang", lang);
        await expect(page.locator("html")).toHaveAttribute("dir", dir);
        await expect(page.locator("h1")).toHaveCount(1);
        await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
        await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(4);
        // Logo is the supplied artwork, not typed text.
        await expect(page.locator('header img[src*="equis-wordmark"]')).toBeVisible();

        // No dead or placeholder links.
        const hrefs = await page.locator("a").evaluateAll((as) => as.map((a) => a.getAttribute("href")));
        for (const href of hrefs) {
          expect(href, "link without href").toBeTruthy();
          expect(href).not.toBe("#");
          expect(href).not.toMatch(/YOUR-DOMAIN|example\.com|javascript:/i);
        }
      });
    }
  });
}

test("no horizontal overflow at common widths (all locales)", async ({ page }) => {
  for (const width of [320, 360, 390, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const { prefix } of locales) {
      for (const path of paths) {
        await page.goto(`${prefix}${path}`);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(overflow, `${prefix}${path} @ ${width}px`).toBeLessThanOrEqual(0);
      }
    }
  }
});

test("internal links all resolve", async ({ page, request }) => {
  const seen = new Set<string>();
  for (const { prefix } of locales) {
    for (const path of paths) {
      await page.goto(`${prefix}${path}`);
      const hrefs = await page.locator('a[href^="/"]').evaluateAll((as) => as.map((a) => a.getAttribute("href")!));
      hrefs.forEach((h) => seen.add(h.split("#")[0]));
    }
  }
  for (const href of seen) {
    const res = await request.get(href);
    expect(res.status(), href).toBe(200);
  }
});

test("language switcher keeps the equivalent page and remembers the choice", async ({ page }) => {
  await page.goto("/en/services");
  await page.locator('header a[hreflang="fr"]:visible').click();
  await expect(page).toHaveURL(/\/fr\/services$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  await page.locator('header a[hreflang="ar-EG"]:visible').click();
  await expect(page).toHaveURL(/\/ar\/services$/);
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await page.goto("/");
  await expect(page).toHaveURL(/\/ar$/);
});

test("Arabic is the default when the browser language is not supported", async ({ browser }) => {
  const ctx = await browser.newContext({ locale: "de-DE" });
  const page = await ctx.newPage();
  await page.goto("/");
  await expect(page).toHaveURL(/\/ar$/);
  await ctx.close();
});

test("hidden and out-of-scope pages are not available", async ({ request }) => {
  for (const p of [
    "/en/transformations",
    "/en/resources",
    "/ar/transformations",
    "/en/login",
    "/en/signup",
    "/en/dashboard",
    "/en/admin",
    "/en/portal",
    "/en/checkout",
  ]) {
    expect((await request.get(p)).status(), p).toBe(404);
  }
});

test("navigation hides conditional pages", async ({ page }) => {
  await page.goto("/en");
  await expect(page.locator('a[href*="transformations"], a[href*="resources"]')).toHaveCount(0);
});

test("mobile menu works with keyboard", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/ar");
  const toggle = page.locator("header button[aria-expanded]");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page.getByRole("navigation", { name: "القائمة الرئيسية" }).getByRole("link", { name: "الخدمات" }).click();
  await expect(page).toHaveURL(/\/ar\/services$/);
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});

test("skip link and visible focus", async ({ page }) => {
  await page.goto("/en");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to main content" });
  await expect(skip).toBeFocused();
  const outline = await skip.evaluate((el) => getComputedStyle(el).outlineStyle);
  expect(outline).not.toBe("none");
});

test("SEO files", async ({ request }) => {
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("Sitemap:");
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain("/en/services");
  expect(sitemap).toContain('hreflang="ar-EG"');
  expect(sitemap).not.toContain("transformations");
  expect((await request.get("/og-image.png")).status()).toBe(200);
});

test("legal pages are marked as drafts, not reviewed", async ({ page }) => {
  for (const p of ["/en/privacy", "/en/terms"]) {
    await page.goto(p);
    await expect(page.getByRole("note").filter({ hasText: "not yet been legally reviewed" })).toBeVisible();
  }
});

test("WhatsApp contact links use the configured number with a localized greeting", async ({ page }) => {
  await page.goto("/ar/contact");
  const link = page.getByRole("link", { name: /كلمنا على واتساب/ }).first();
  await expect(link).toBeVisible();
  const href = (await link.getAttribute("href"))!;
  expect(href.startsWith("https://wa.me/201055663884?text=")).toBe(true);
  expect(decodeURIComponent(href.split("text=")[1])).toBe("أهلًا EQUIS، حابب أسأل عن الاستشارة.");
  await expect(link).toHaveAttribute("rel", /noopener/);
  await page.goto("/en");
  await expect(page.getByRole("link", { name: /Message us on WhatsApp/ })).toHaveAttribute(
    "href",
    /^https:\/\/wa\.me\/201055663884\?text=/,
  );
  await expect(page.locator("footer")).toContainText("+20 10 5566 3884");
});
