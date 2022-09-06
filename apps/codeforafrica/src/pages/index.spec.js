const { test, expect } = require("@playwright/test");

test("/", async ({ page }) => {
  await page.goto("/");
  const title = await page.title();
  expect(title).toBe(
    "Code for Africa: The continent's largest network of civic technology and data journalism labs. | Code for Africa"
  );
});
