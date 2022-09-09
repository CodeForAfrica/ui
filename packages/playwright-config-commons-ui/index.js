const { devices } = require("@playwright/test");

const PORT = 3000;
const config = {
  testMatch: /.*\.spec.js/,
  /* Maximum time one test can run for. */
  timeout: 2 * 60 * 1000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: `http://localhost:${PORT}/`,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
      },
    },
    /* Test against mobile viewports. */
    {
      name: "Mobile Chrome",
      use: {
        ...devices["Pixel 5"],
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: "npm run start",
    port: PORT,
    reuseExistingServer: !process.env.CI,
  },
};

module.exports = config;
