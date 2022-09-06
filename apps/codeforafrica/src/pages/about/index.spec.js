const { test, expect } = require("@playwright/test");

test("/about", async ({ page }) => {
  await page.goto("/about");
  const title = await page.title();
  expect(title).toBe("About Us | Code for Africa");
});
