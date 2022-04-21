const { test, expect } = require("@playwright/test");

test("basic test", async ({ page }) => {
  await page.goto("http://localhost:3002/");
  const title = await page.title();
  expect(title).toBe("Code for Africa");
});
