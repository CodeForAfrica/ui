const { test, expect } = require("@playwright/test");

test("/projects/[slug]", async ({ page }) => {
  await page.goto("/projects/wanadata");
  const title = await page.title();
  expect(title).toBe("WanaData | Our Work | Code for Africa");
});
