const { test, expect } = require("@playwright/test");

test("/imprint", async ({ page }) => {
  await page.goto("/imprint");
  const title = await page.title();
  expect(title).toBe("Imprint | Code for Africa");
});
