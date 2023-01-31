const { test, expect } = require("@playwright/test");

test("/opportunities/helpdesk", async ({ page }) => {
  await page.goto("/opportunities/helpdesk");
  const title = await page.title();
  expect(title).toBe("Helpdesk");
});
