const { test, expect } = require("@playwright/test");

test("/", async ({ page }) => {
  await page.goto("/");
  const title = await page.title();
  expect(title).toBe("charter.AFRICA");
});

test("/about", async ({ page }) => {
  await page.goto("/about");
  const title = await page.title();
  expect(title).toBe("About");
});
