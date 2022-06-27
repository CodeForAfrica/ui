const { test, expect } = require("@playwright/test");

test("/projects", async ({ page }) => {
  await page.goto("/projects");
  const title = await page.title();
  expect(title).toBe("Our Work | Code for Africa");
});
