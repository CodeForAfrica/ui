/* eslint-env jest */

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

module.exports = require("@commons-ui/testing-library/jest.setup");
