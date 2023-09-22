/* eslint-env jest */
global.TextEncoder = jest.fn().mockImplementation(() => ({
  encode: jest.fn(),
  encodeInto: jest.fn(),
}));

global.TextDecoder = jest.fn().mockImplementation(() => ({
  decode: jest.fn(),
}));

global.TextEncoder = jest.fn().mockImplementation(() => ({
  encode: jest.fn(),
  encodeInto: jest.fn(),
}));

global.TextDecoder = jest.fn().mockImplementation(() => ({
  decode: jest.fn(),
}));

process.env.NEXT_PUBLIC_APP_URL = "http://localhost:3000";

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    asPath: "",
    isReady: true,
    push: jest.fn(),
    query: {},
  })),
}));

module.exports = require("@commons-ui/testing-library/jest.setup");
