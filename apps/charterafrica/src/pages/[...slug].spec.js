const { test, expect } = require("@playwright/test");

test("/About", async ({ page }) => {
  await page.goto("/about");
  const title = await page.title();
  expect(title).toBe("About");
});
