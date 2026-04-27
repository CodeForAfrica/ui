require("jest-config-commons-ui/setup/browser");

// NOTE: Since we use Jest for component testing i.e. unit testing, it's not
//       recommended to load external env vars (since outcome will not be
//       predictable)
process.env.APP_URL = "http://localhost:3000";

require("jest-config-commons-ui/setup/next/router");
require("jest-config-commons-ui/setup/sentry");

module.exports = require("@commons-ui/testing-library/jest.setup");
