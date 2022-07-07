const { test, expect } = require("@playwright/test");

test.describe("/about/[unit]", () => {
  test("[unit]=members", async ({ page }) => {
    await page.goto("/about/members");
    const title = await page.title();
    expect(title).toBe("Members | About | Code for Africa");
  });

  test("[unit]=partners", async ({ page }) => {
    await page.goto("/about/partners");
    const title = await page.title();
    expect(title).toBe("Partners | About | Code for Africa");
  });
});
