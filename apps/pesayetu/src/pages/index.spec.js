const { test, expect } = require("@playwright/test");

test("/", async ({ page }) => {
  await page.goto("/");
  const title = await page.locator(".index_title__gEapU");
  await expect(title).toHaveText("Data to hold your government accountable");
});
