const { test, expect } = require("@playwright/test");

test("/opportunites/[slug]", async ({ page }) => {
  await page.goto("http://localhost:3002/opportunities/1");
  const title = await page.title();
  expect(title).toBe(
    "Security Evangelist: Secure our defences against digital threats"
  );
});
