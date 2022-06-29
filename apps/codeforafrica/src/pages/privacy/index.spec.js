const { test, expect } = require("@playwright/test");

test("/privacy", async ({ page }) => {
  await page.goto("/privacy");
  const title = await page.title();
  expect(title).toBe("Privacy | Code for Africa");
});
