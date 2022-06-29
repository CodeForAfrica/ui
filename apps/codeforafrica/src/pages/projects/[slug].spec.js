const { test, expect } = require("@playwright/test");

test("/projects/[slug]", async ({ page }) => {
  await page.goto("/projects/wana-data");
  const title = await page.title();
  expect(title).toBe("WanaData | Projects | Code for Africa");
});
