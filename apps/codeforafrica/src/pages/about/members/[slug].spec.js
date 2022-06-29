const { test, expect } = require("@playwright/test");

test("/about/members/[slug]", async ({ page }) => {
  await page.goto("/about/members/member-1");
  const title = await page.title();
  expect(title).toBe("Justin Arenstein | Members | About | Code for Africa");
});
