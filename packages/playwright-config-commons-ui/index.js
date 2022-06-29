const { devices } = require("@playwright/test");

const PORT = 3000;
const config = {
  testMatch: /.*\.spec.js/,
  timeout: 2 * 60 * 1000,
  use: {
    trace: "on-first-retry",
    baseURL: `http://localhost:${PORT}/`,
  },
  webServer: {
    command: "npm run start",
    port: PORT,
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
