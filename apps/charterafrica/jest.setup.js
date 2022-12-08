/* eslint-env jest */

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    asPath: "",
    isReady: true,
    push: jest.fn(),
    query: {},
  })),
}));

module.exports = require("@commons-ui/testing-library/jest.setup");
