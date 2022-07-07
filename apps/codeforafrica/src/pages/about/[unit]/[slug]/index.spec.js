const { test, expect } = require("@playwright/test");

test.describe("/about/[unit]/[slug]", () => {
  test("[unit]=members,[slug]=member-1", async ({ page }) => {
    await page.goto("/about/members/member-1");
    const title = await page.title();
    expect(title).toBe("Justin Arenstein | Members | About | Code for Africa");
  });

  test("[unit]=partners,[slug]=meta", async ({ page }) => {
    await page.goto("/about/partners/meta");
    const title = await page.title();
    expect(title).toBe("Meta | Partners | About | Code for Africa");
  });
});
