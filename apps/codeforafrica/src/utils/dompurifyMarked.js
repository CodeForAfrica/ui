const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");

const { window } = new JSDOM("");
const DOMPurify = createDOMPurify(window);

module.exports = DOMPurify;
