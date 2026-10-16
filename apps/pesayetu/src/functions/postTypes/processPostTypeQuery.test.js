import processPostTypeQuery from "@/pesayetu/functions/postTypes/processPostTypeQuery";
import { initializeWpApollo } from "@/pesayetu/lib/wordpress/connector";

jest.mock("@/pesayetu/lib/wordpress/connector", () => ({
  initializeWpApollo: jest.fn(),
}));
jest.mock("@/pesayetu/functions/menus/getMenus", () => jest.fn());
jest.mock("@/pesayetu/functions/seo/formatDefaultSeoData", () => jest.fn());

describe("processPostTypeQuery", () => {
  const query = {};
  let queryWordPress;

  beforeEach(() => {
    queryWordPress = jest.fn();
    initializeWpApollo.mockReturnValue({ query: queryWordPress });
  });

  it("reports genuinely missing CMS content as not found", async () => {
    queryWordPress.mockResolvedValue({ data: { page: null } });

    await expect(
      processPostTypeQuery("page", "explore", query),
    ).resolves.toMatchObject({
      error: true,
      post: null,
    });
  });

  it("rejects malformed CMS responses rather than reporting missing content", async () => {
    queryWordPress.mockResolvedValue({ data: null });

    await expect(
      processPostTypeQuery("page", "explore", query),
    ).rejects.toBeInstanceOf(TypeError);
  });

  it("can generate content again after a request failure", async () => {
    const failure = new Error("CMS gateway timeout");
    const post = { seo: { canonical: "https://example.org/explore/" } };
    queryWordPress
      .mockRejectedValueOnce(failure)
      .mockResolvedValue({ data: { page: post } });

    await expect(processPostTypeQuery("page", "explore", query)).rejects.toBe(
      failure,
    );
    await expect(
      processPostTypeQuery("page", "explore", query),
    ).resolves.toMatchObject({ error: false, post });
  });

  it("propagates CMS outages so Next.js can preserve the last good page", async () => {
    const failure = new Error("CMS gateway timeout");
    queryWordPress.mockRejectedValue(failure);

    await expect(processPostTypeQuery("page", "explore", query)).rejects.toBe(
      failure,
    );
  });
});
