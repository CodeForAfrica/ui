module.exports = require("@commons-ui/testing-library/jest.setup");

if (!global.TextEncoder || !global.TextDecoder) {
  // TextDecoder and TextDecoder are not available in jsdom, so we need to polyfill them
  // eslint-disable-next-line global-require
  const { TextEncoder, TextDecoder } = require("util");
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}
