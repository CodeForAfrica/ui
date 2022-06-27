const { test, expect } = require("@playwright/test");

test("/", async ({ page }) => {
  await page.goto("/");
  const title = await page.title();
  expect(title).toBe("Code for Africa");
});
