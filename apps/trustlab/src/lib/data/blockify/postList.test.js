import postList from "./postList";

import { getPosts } from "@/trustlab/utils/post";

jest.mock("@/trustlab/utils/post", () => ({
  getPosts: jest.fn(),
}));

describe("blockify/postList", () => {
  beforeEach(() => {
    getPosts.mockResolvedValue({ posts: [], pagination: {} });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("queries selected posts by ID whether or not they were populated", async () => {
    const block = {
      blockType: "post-list",
      showAllPosts: false,
      posts: [{ id: "published" }, "unpublished-id"],
    };

    await postList(block, {}, { params: { slugs: ["news"] } });

    expect(getPosts).toHaveBeenCalledWith({}, "news", {
      where: { id: { in: "published,unpublished-id" } },
    });
  });
});
