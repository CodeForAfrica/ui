const util = require("util");

module.exports = require("@commons-ui/testing-library/jest.setup");

// TextDecoder and TextDecoder are not available in jsdom, so we need to polyfill them
global.TextEncoder = util.TextEncoder;
global.TextDecoder = util.TextDecoder;
