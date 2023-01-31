const { test, expect } = require("@playwright/test");

test("/knowledge/explainers", async ({ page }) => {
  await page.goto("/knowledge/explainers");
  const title = await page.title();
  expect(title).toBe("Explainers");
});
