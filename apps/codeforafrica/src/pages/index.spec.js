const { test, expect } = require("@playwright/test");

test("basic test", async ({ page }) => {
  await page.goto("http://localhost:3002/");
  const title = await page.locator("h1");
  await expect(title).toHaveText("This is the official CFA SITE");
});
