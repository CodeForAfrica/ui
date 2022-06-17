const { test, expect } = require("@playwright/test");

test("/imprint", async ({ page }) => {
  await page.goto("http://localhost:3002/imprint");
  const title = await page.title();
  expect(title).toBe("Imprint | Code for Africa");
});
