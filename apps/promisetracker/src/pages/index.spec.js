const { test, expect } = require("@playwright/test");

test("/", async ({ page }) => {
  await page.goto("http://localhost:3001/");
  const title = await page.locator(".index_title__gEapU");
  await expect(title).toHaveText("Tracking Politician");
});
