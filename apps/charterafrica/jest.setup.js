/* eslint-env jest */

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

global.TextEncoder = jest.fn().mockImplementation(() => ({
  encode: jest.fn(),
  encodeInto: jest.fn(),
}));

global.TextDecoder = jest.fn().mockImplementation(() => ({
  decode: jest.fn(),
}));

// NOTE: Since we use Jest for component testing i.e. unit testing, it's not
//       recommended to load external env vars (since outcome will not be
//       predictable)
process.env.NEXT_PUBLIC_APP_URL = "http://localhost:3000";

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    asPath: "",
    isReady: true,
    locale: "en",
    locales: ["en", "fr", "pt"],
    push: jest.fn(),
    query: {},
  })),
}));

module.exports = require("@commons-ui/testing-library/jest.setup");
