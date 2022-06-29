const { test, expect } = require("@playwright/test");

test("/stories", async ({ page }) => {
  await page.goto("/stories");
  const title = await page.title();
  expect(title).toBe("Stories | Code for Africa");
});
