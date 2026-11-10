import spotlightOverview from "./spotlightOverview";

import { getPost } from "@/trustlab/utils/post";

jest.mock("@/trustlab/utils/post", () => ({
  getPost: jest.fn(),
}));

describe("blockify/spotlightOverview", () => {
  beforeEach(() => {
    getPost.mockResolvedValue({ link: { href: "/news/published" } });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("leaves out posts that weren't populated", async () => {
    const block = {
      blockType: "spotlight",
      items: [
        {
          item: {
            id: "published",
            slug: "published",
            title: "Published",
            excerpt: "Excerpt",
            tags: [{ name: "News" }],
          },
        },
        { item: "unpublished-id" },
      ],
    };

    const { items } = await spotlightOverview(block, {});

    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({
      id: "published",
      title: "Published",
      tag: "News",
      href: "/news/published",
    });
    expect(getPost).toHaveBeenCalledTimes(1);
  });
});
