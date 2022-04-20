const { devices } = require("@playwright/test");

const config = {
  timeout: 30 * 1000,
  testMatch: /.*\.spec.js/,
  use: {
    trace: "on-first-retry",
  },
  webServer: {
    command: "npm run dev",
    port: 3000,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
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
  ],
};

module.exports = config;
