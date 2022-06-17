const { test, expect } = require("@playwright/test");

test("/contact", async ({ page }) => {
  await page.goto("http://localhost:3002/contact");
  const title = await page.title();
  expect(title).toBe("Contact | Code for Africa");
});
