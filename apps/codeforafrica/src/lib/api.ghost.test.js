import GhostContentAPI from "@tryghost/content-api";

jest.mock("@tryghost/content-api");

// before each clear GhostContentAPI.__mocks__
beforeEach(() => {
  GhostContentAPI.mockClear();
});

// simulate the behavior of the GhostContentAPI
const ghostContentAPIMock = {
  posts: jest.fn(() =>
    Promise.resolve({
      posts: [],
    })
  ),
};

// simple test to check if the mock is working
test("GhostContentAPI is mocked", () => {
  expect(ghostContentAPIMock.posts).toBeDefined();
});
