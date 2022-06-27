const { test, expect } = require("@playwright/test");

test("/stories/[slug]", async ({ page }) => {
  await page.goto("/stories/article-3");
  const title = await page.title();
  expect(title).toBe("Article title goes in here | Stories | Code for Africa");
});
