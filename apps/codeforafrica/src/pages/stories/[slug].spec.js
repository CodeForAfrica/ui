const { test, expect } = require("@playwright/test");

test("/stories/[slug]", async ({ page }) => {
  await page.goto(
    "/stories/battle-for-gender-equality-in-african-media-continues"
  );
  const title = await page.title();
  expect(title).toBe(
    "Battle for gender equality in African media continues | Stories | Code for Africa"
  );
});
