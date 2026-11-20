import { expect, test } from "@playwright/test";

const CONFIGURED = "http://localhost:3201";

test.describe("contact form — no provider configured", () => {
  test("shows an honest notice and cannot be submitted", async ({ page }) => {
    await page.goto("/en/contact");
    await expect(page.getByRole("status")).toContainText("Online enquiries are not open yet");
    await expect(page.getByRole("button", { name: "Send enquiry" })).toBeDisabled();
  });

  test("API refuses to pretend delivery", async ({ request }) => {
    const res = await request.post("/api/enquiry", {
      data: {
        enquiry: {
          name: "A",
          email: "a@b.co",
          phone: "",
          country: "",
          goal: "",
          preferredContact: "email",
          message: "",
          consent: true,
        },
        meta: { website: "", startedAt: Date.now() - 10_000, locale: "en" },
      },
    });
    expect(res.status()).toBe(503);
    expect(await res.json()).toEqual({ status: "not_configured" });
  });

  test("API validates server-side", async ({ request }) => {
    const res = await request.post("/api/enquiry", {
      data: { enquiry: { name: "" }, meta: { website: "", startedAt: Date.now() - 10_000, locale: "en" } },
    });
    expect(res.status()).toBe(400);
  });

  test("form does not ask for health data", async ({ page }) => {
    await page.goto("/en/contact");
    const names = await page.locator("form [name]").evaluateAll((els) => els.map((e) => e.getAttribute("name")));
    expect(names.sort()).toEqual(
      [
        "consent",
        "country",
        "email",
        "goal",
        "message",
        "name",
        "phone",
        "preferredContact",
        "preferredContact",
        "preferredContact",
        "website",
      ].sort(),
    );
  });
});

test.describe("contact form — provider configured", () => {
  test.use({ baseURL: CONFIGURED });

  test("client validation shows accessible errors", async ({ page }) => {
    await page.goto("/en/contact");
    await page.getByRole("button", { name: "Send enquiry" }).click();
    await expect(page.getByText("Please enter your name.")).toBeVisible();
    await expect(page.getByText("Please provide an email or a phone number.").first()).toBeVisible();
    await expect(page.getByText("Please confirm we may contact you.")).toBeVisible();
    await expect(page.getByLabel(/Full name/)).toHaveAttribute("aria-invalid", "true");
  });

  test("shows a failure (not success) when delivery fails", async ({ page }) => {
    await page.goto("/ar/contact");
    await page.waitForTimeout(3100); // minimum human fill time
    await page.getByLabel(/الاسم بالكامل/).fill("تجربة");
    await page
      .getByLabel(/الإيميل/)
      .first()
      .fill("test@example.org");
    await page.getByLabel("إيميل", { exact: true }).check();
    await page.getByLabel(/أوافق/).check();
    await page.getByRole("button", { name: "ابعت الطلب" }).click();
    await expect(page.getByRole("alert").filter({ hasText: "للأسف الطلب متبعتش" })).toBeVisible();
    await expect(page.getByText("شكرًا — طلبك وصل")).toHaveCount(0);
  });

  test("shows success only when the server confirms", async ({ page }) => {
    await page.route("**/api/enquiry", (route) => route.fulfill({ status: 200, json: { status: "ok" } }));
    await page.goto("/fr/contact");
    await page.getByLabel(/Nom complet/).fill("Test");
    await page.getByLabel(/Téléphone \/ WhatsApp/).fill("+20 100 000 0000");
    await page.getByLabel("WhatsApp", { exact: true }).check();
    await page.getByLabel(/J'accepte/).check();
    await page.getByRole("button", { name: "Envoyer la demande" }).click();
    await expect(page.getByRole("status")).toContainText("votre demande a bien été reçue");
  });
});
