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
