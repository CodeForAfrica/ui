import getEmbedOrigin from "./embed";

describe("embed utils", () => {
  it("returns the embed origin when the iframe url is valid", () => {
    expect(getEmbedOrigin("https://airtable.com/embed/app123")).toBe(
      "https://airtable.com",
    );
  });

  it("returns null when the iframe url is invalid", () => {
    expect(getEmbedOrigin("not-a-url")).toBeNull();
  });
});
