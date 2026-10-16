import getPostTypeById from "@/pesayetu/functions/postTypes/getPostTypeById";
import getPostTypeStaticProps from "@/pesayetu/functions/postTypes/getPostTypeStaticProps";

jest.mock("@/pesayetu/functions/postTypes/getPostTypeById", () => jest.fn());
jest.mock("@/pesayetu/functions/postTypes/getFrontendPage", () => jest.fn());
jest.mock("@/pesayetu/functions/postTypes/getPostTypeArchive", () => jest.fn());
jest.mock("@/pesayetu/functions/postTypes/getPostTypeTaxonomyArchive", () =>
  jest.fn(),
);
jest.mock("@/pesayetu/lib/apolloConfig", () => ({ addApolloState: jest.fn() }));

describe("getPostTypeStaticProps", () => {
  it("sets a retry interval for missing CMS content", async () => {
    getPostTypeById.mockResolvedValue({ error: true, post: null });

    await expect(
      getPostTypeStaticProps({ slug: "explore" }, "page"),
    ).resolves.toEqual({
      notFound: true,
      revalidate: 300,
    });
  });

  it("propagates dependency failures instead of reporting missing content", async () => {
    const failure = new Error("CMS unavailable");
    getPostTypeById.mockRejectedValue(failure);

    await expect(
      getPostTypeStaticProps({ slug: "explore" }, "page"),
    ).rejects.toBe(failure);
  });
});
