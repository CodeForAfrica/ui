const { test, expect } = require("@playwright/test");

test("/about", async ({ page }) => {
  await page.goto("http://localhost:3002/about");
  const title = await page.title();
  expect(title).toBe("About | Code for Africa");
});
