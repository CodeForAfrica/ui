const { test, expect } = require("@playwright/test");

test("basic test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  const title = await page.locator(".index_title__gEapU");
  await expect(title).toHaveText("Docs Welcome to Next.js!");
});
