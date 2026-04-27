/* global jest */

const mockRouter = {
  asPath: "",
  back: jest.fn(),
  basePath: "",
  beforePopState: jest.fn(),
  events: {
    emit: jest.fn(),
    off: jest.fn(),
    on: jest.fn(),
  },
  isFallback: false,
  isLocaleDomain: false,
  isPreview: false,
  isReady: true,
  locale: "en",
  locales: ["en"],
  pathname: "/",
  prefetch: jest.fn(() => Promise.resolve()),
  push: jest.fn(),
  query: {},
  reload: jest.fn(),
  replace: jest.fn(),
  route: "/",
};
const mockUseRouter = jest.fn(() => mockRouter);

jest.mock("next/router", () => ({
  __esModule: true,
  default: mockRouter,
  useRouter: mockUseRouter,
}));

module.exports = {
  mockRouter,
  mockUseRouter,
};
