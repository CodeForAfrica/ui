const { test, expect } = require("@playwright/test");

test("/opportunites", async ({ page }) => {
  await page.goto("http://localhost:3002/opportunities");
  const title = await page.title();
  expect(title).toBe("Opportunities | Code for Africa");
});
