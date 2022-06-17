const { test, expect } = require("@playwright/test");

test("/privacy", async ({ page }) => {
  await page.goto("http://localhost:3002/privacy");
  const title = await page.title();
  expect(title).toBe("Privacy | Code for Africa");
});
