import GhostContentAPI from "@tryghost/content-api";

jest.mock("@tryghost/content-api");

// before each clear GhostContentAPI.__mocks__
beforeEach(() => {
  GhostContentAPI.mockClear();
});

// simple test to check if the library is working
test("GhostContentAPI is working", () => {
  expect(GhostContentAPI).toBeDefined();
});
