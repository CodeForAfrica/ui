/* eslint-env jest */

global.TextEncoder = jest.fn().mockImplementation(() => ({
  encode: jest.fn(),
  encodeInto: jest.fn(),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    asPath: "",
    isReady: true,
    push: jest.fn(),
    query: {},
  })),
}));

jest.mock("react-leaflet", () => ({}));

module.exports = require("@commons-ui/testing-library/jest.setup");
