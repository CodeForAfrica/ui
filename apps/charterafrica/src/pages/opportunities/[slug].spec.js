const { test, expect } = require("@playwright/test");

test("/opportunities/helpdesk", async ({ page }) => {
  await page.goto("/");
  const title = await page.title();
  expect(title).toBe("Helpdesk");
});
