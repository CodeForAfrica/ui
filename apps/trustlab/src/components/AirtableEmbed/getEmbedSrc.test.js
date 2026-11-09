import getEmbedSrc from "./getEmbedSrc";

describe("getEmbedSrc", () => {
  it("returns the https src of an iframe embed", () => {
    expect(
      getEmbedSrc(
        '<iframe class="airtable-embed" src="https://airtable.com/embed/form?a=1&amp;b=2" width="100%"></iframe>',
      ),
    ).toBe("https://airtable.com/embed/form?a=1&b=2");
  });

  it("ignores embed code without an iframe", () => {
    expect(
      getEmbedSrc('<script src="https://example.com/x.js"></script>'),
    ).toBe(null);
    expect(getEmbedSrc("<div>Hello</div>")).toBe(null);
    expect(getEmbedSrc("")).toBe(null);
    expect(getEmbedSrc(undefined)).toBe(null);
  });

  it("ignores iframes that don't use https", () => {
    expect(getEmbedSrc('<iframe src="http://example.com"></iframe>')).toBe(
      null,
    );
    expect(getEmbedSrc('<iframe src="javascript:alert(1)"></iframe>')).toBe(
      null,
    );
    expect(
      getEmbedSrc('<iframe src="data:text/html,<p>hi</p>"></iframe>'),
    ).toBe(null);
    expect(getEmbedSrc('<iframe src="/relative"></iframe>')).toBe(null);
  });
});
