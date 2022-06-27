const { test, expect } = require("@playwright/test");

test("/contact", async ({ page }) => {
  await page.goto("/contact");
  const title = await page.title();
  expect(title).toBe("Contact | Code for Africa");
});
