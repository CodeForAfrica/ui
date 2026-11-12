const HTML_ENTITIES = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
};

// Attribute values in pasted embed code are HTML-escaped (e.g. `&` appears
// as `&amp;` between query params); the browser would decode them when
// parsing HTML, so we must too before reusing the URL as an iframe src.
function decodeHtmlEntities(value) {
  return value.replace(/&(?:amp|lt|gt|quot|#39);/g, (entity) => {
    return HTML_ENTITIES[entity];
  });
}

// Embed code is only ever rendered as an iframe pointing at an https URL;
// anything else (scripts, raw HTML, other URL schemes) is not embedded.
function getEmbedSrc(embedCode) {
  const match = embedCode?.match(/<iframe[^>]*\ssrc=["']([^"']+)["']/i);
  if (!match?.[1]) {
    return null;
  }
  const src = decodeHtmlEntities(match[1]);
  try {
    return new URL(src).protocol === "https:" ? src : null;
  } catch {
    return null;
  }
}

export default getEmbedSrc;
