const { test, expect } = require("@playwright/test");

test.describe("/about/[unit]/[slug]", () => {
  test("[unit]=members,[slug]=justin-arenstein", async ({ page }) => {
    await page.goto("/about/members/justin-arenstein");
    const title = await page.title();
    expect(title).toBe("Justin Arenstein | Members | About | Code for Africa");
  });

  test("[unit]=partners,[slug]=meta", async ({ page }) => {
    await page.goto("/about/partners/meta");
    const title = await page.title();
    expect(title).toBe("Meta | Partners | About | Code for Africa");
  });
});
