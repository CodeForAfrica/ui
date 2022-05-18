const { test, expect } = require("@playwright/test");

test("/stories/[slug]", async ({ page }) => {
  await page.goto("http://localhost:3002/projects/wana-data");
  const title = await page.title();
  expect(title).toBe("WanaData | Projects | Code for Africa");
});
