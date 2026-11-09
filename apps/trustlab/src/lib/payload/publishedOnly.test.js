import { publishedOnly } from "./publishedOnly";

const PUBLISHED = { _status: { equals: "published" } };

describe("lib/payload/publishedOnly", () => {
  it("restricts collections with drafts to published documents", () => {
    expect(publishedOnly(undefined, { drafts: true })).toEqual(PUBLISHED);
  });

  it("keeps existing filters alongside the published restriction", () => {
    const where = { slug: { equals: "about" } };

    expect(publishedOnly(where, { drafts: true })).toEqual({
      and: [where, PUBLISHED],
    });
  });

  it("leaves draft reads unrestricted", () => {
    const where = { slug: { equals: "about" } };

    expect(publishedOnly(where, { draft: true, drafts: true })).toBe(where);
  });

  it("leaves collections without drafts unrestricted", () => {
    const where = { slug: { equals: "about" } };

    expect(publishedOnly(where, { drafts: false })).toBe(where);
    expect(publishedOnly(undefined)).toBeUndefined();
  });
});
