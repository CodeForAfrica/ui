const { TextDecoder, TextEncoder } = require("node:util");

/* global jest */

global.TextDecoder = global.TextDecoder || TextDecoder;
global.TextEncoder = global.TextEncoder || TextEncoder;

global.ResizeObserver =
  global.ResizeObserver ||
  class ResizeObserver {
    observe() {}

    unobserve() {}

    disconnect() {}
  };

if (global.Element?.prototype && !global.Element.prototype.scrollIntoView) {
  global.Element.prototype.scrollIntoView = jest.fn();
}

global.matchMedia =
  global.matchMedia ||
  jest.fn().mockImplementation((query) => ({
    addEventListener: jest.fn(),
    addListener: jest.fn(),
    dispatchEvent: jest.fn(),
    matches: false,
    media: query,
    onchange: null,
    removeEventListener: jest.fn(),
    removeListener: jest.fn(),
  }));

global.CSS = global.CSS || {};
global.CSS.supports = global.CSS.supports || jest.fn(() => false);
