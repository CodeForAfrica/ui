export function sortTags(tags) {
  // Since we know 2 different tags can't have the same slug, we can just use
  // an object instead of `Set` and `find`
  const tagsBySlug = tags.reduce((acc, curr) => {
    acc[curr.slug] = curr;
    return acc;
  }, {});
  return Object.keys(tagsBySlug)
    .sort()
    .map((slug) => tagsBySlug[slug]);
}

export default null;
