/* eslint-env jest */

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    asPath: "",
    isReady: true,
    push: jest.fn(),
    query: {},
  })),
}));

module.exports = require("@commons-ui/testing-library/jest.setup");
