const { devices } = require("@playwright/test");

const config = {
  timeout: 30 * 1000,
  testMatch: /.*\.spec.js/,
  expect: {
    timeout: 5000,
  },
  reporter: "html",
  use: {
    actionTimeout: 0,
    headless: false,
    viewport: { width: 1280, height: 720 },
    trace: "on-first-retry",
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
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
      },
    },
  ],
};

module.exports = config;
