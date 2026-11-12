import spotlightOverview from "./spotlightOverview";

describe("blockify/spotlightOverview", () => {
  const published = {
    id: "published",
    slug: "published",
    title: "Published",
    excerpt: "Excerpt",
    image: { src: "/image.png", alt: "Image" },
    tags: [{ name: "News" }],
    link: { href: "/news/published" },
  };
  const other = {
    id: "other",
    title: "Other",
    link: { href: "/news/other" },
  };

  it("shows only the selected posts that the posts query returns, in the selected order", async () => {
    const api = {
      // e.g. read access leaves out the unpublished post
      getCollection: jest.fn().mockResolvedValue({ docs: [published, other] }),
    };
    const block = {
      blockType: "spotlight",
      items: [
        { item: "other", title: "Card" },
        { item: "unpublished-id" },
        { item: { id: "published" }, buttonLink: { label: "Read" } },
      ],
    };

    const { items } = await spotlightOverview(block, api);

    expect(api.getCollection).toHaveBeenCalledWith("posts", {
      draft: false,
      where: { id: { in: "other,unpublished-id,published" } },
    });
    expect(items).toEqual([
      {
        excerpt: undefined,
        image: { src: "", alt: "" },
        title: "Other",
        cardTitle: "Card",
        tag: null,
        id: "other",
        href: "/news/other",
        buttonLink: null,
      },
      {
        excerpt: "Excerpt",
        image: { src: "/image.png", alt: "Image" },
        title: "Published",
        cardTitle: "",
        tag: "News",
        id: "published",
        href: "/news/published",
        buttonLink: { label: "Read" },
      },
    ]);
  });

  it("queries drafts in preview", async () => {
    const api = { getCollection: jest.fn().mockResolvedValue({ docs: [] }) };

    await spotlightOverview(
      { blockType: "spotlight", items: [{ item: "draft" }] },
      api,
      { draftMode: true },
    );

    expect(api.getCollection).toHaveBeenCalledWith("posts", {
      draft: true,
      where: { id: { in: "draft" } },
    });
  });

  it("doesn't query posts when none are selected", async () => {
    const api = { getCollection: jest.fn() };

    const { items } = await spotlightOverview(
      { blockType: "spotlight", items: [] },
      api,
    );

    expect(items).toEqual([]);
    expect(api.getCollection).not.toHaveBeenCalled();
  });
});
