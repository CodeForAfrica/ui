require("jest-config-commons-ui/setup/browser");

process.env.NEXT_PUBLIC_APP_URL = "http://localhost:3000";

require("jest-config-commons-ui/setup/next/router");

module.exports = require("@commons-ui/testing-library/jest.setup");
