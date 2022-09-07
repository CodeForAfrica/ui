/* eslint-env browser */
import DOMPurify from "dompurify";
import { marked as realMarked } from "marked";

let global;
if (typeof window !== "undefined") {
  global = window;
} else {
  // lib/marked will only be used server-side hence require is fine
  // eslint-disable-next-line global-require
  const { JSDOM } = require("jsdom");
  global = new JSDOM("").window;
}

const purify = DOMPurify(global);
function marked(src, opt, callback) {
  return purify.sanitize(realMarked(src, opt, callback));
}

marked.parseInline = function parseInline(src, opt) {
  return purify.sanitize(realMarked.parseInline(src, opt));
};

export default marked;
