import { defineConfig, devices } from "@playwright/test";

// Run `npm run build` first. Two servers from the same build:
//  - 3200: no enquiry provider (default, honest fallback)
//  - 3201: provider configured to an unreachable endpoint (exercises the form UI and failure state)
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  reporter: [["list"]],
  use: { baseURL: "http://localhost:3200", trace: "off" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: [
    {
      command: "npx next start -p 3200",
      url: "http://localhost:3200/en",
      reuseExistingServer: !process.env.CI,
      env: { ENQUIRY_PROVIDER: "" },
    },
    {
      command: "npx next start -p 3201",
      url: "http://localhost:3201/en",
      reuseExistingServer: !process.env.CI,
      env: { ENQUIRY_PROVIDER: "webhook", ENQUIRY_DESTINATION: "https://127.0.0.1:9/unreachable" },
    },
  ],
});
