import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import { marked as realMarked } from "marked";

const { window } = new JSDOM("");
const purify = DOMPurify(window);

function marked(src, opt, callback) {
  return purify.sanitize(realMarked(src, opt, callback));
}

marked.parseInline = function (src, opt) {
  return purify.sanitize(realMarked.parseInline(src, opt));
};

export default marked;
