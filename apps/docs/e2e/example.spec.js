const { test } = require("@playwright/test");

test("basic test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
});
