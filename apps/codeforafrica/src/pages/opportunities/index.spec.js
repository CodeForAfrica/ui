const { test, expect } = require("@playwright/test");

test("/opportunites", async ({ page }) => {
  await page.goto("/opportunities");
  const title = await page.title();
  expect(title).toBe("Opportunities | Code for Africa");
});
