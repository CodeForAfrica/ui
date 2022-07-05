const { test, expect } = require("@playwright/test");

test("/about/members", async ({ page }) => {
  await page.goto("/about/members");
  const title = await page.title();
  expect(title).toBe("Members | About | Code for Africa");
});
