import { FilterXSS } from "xss";

const embedSanitizer = new FilterXSS({
  whiteList: {
    a: ["href", "target", "rel", "aria-label"],
    br: [],
    div: ["class"],
    iframe: [
      "allow",
      "allowfullscreen",
      "class",
      "frameborder",
      "height",
      "loading",
      "name",
      "referrerpolicy",
      "sandbox",
      "scrolling",
      "src",
      "title",
      "width",
    ],
    p: ["class"],
    section: ["class"],
    span: ["class"],
  },
  stripIgnoreTag: true,
  stripIgnoreTagBody: ["script", "style"],
});

export default function sanitizeEmbedHtml(html) {
  if (!html?.trim()) {
    return "";
  }

  return embedSanitizer.process(html);
}
