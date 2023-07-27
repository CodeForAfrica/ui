const { test, expect } = require("@playwright/test");

test("/opportunites/[slug]", async ({ page }) => {
  await page.goto(
    "/opportunities/full-stack-software-engineer-come-help-build-digital-democracies"
  );
  const title = await page.title();
  expect(title).toBe(
    "FULL STACK SOFTWARE ENGINEER: Come help build digital democracies | Opportunities | Code for Africa"
  );
});
