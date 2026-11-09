const PUBLISHED = {
  _status: {
    equals: "published",
  },
};

// The local API overrides collection access, so public readers of collections
// with drafts must ask for published documents themselves. Draft reads
// (`draft: true`) are left alone: only authenticated previews request them.
export function publishedOnly(where, { draft, drafts } = {}) {
  if (draft || !drafts) {
    return where;
  }
  if (!where) {
    return PUBLISHED;
  }
  return { and: [where, PUBLISHED] };
}

export default publishedOnly;
