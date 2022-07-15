import { getCollectionSlugs, getCollectionBySlug } from "./utils";

export default function getCollectionData(collectionDir, fields = []) {
  const slugs = getCollectionSlugs(collectionDir);
  const collections = [];
  slugs.forEach((slug) => {
    const collection = getCollectionBySlug(collectionDir, slug, fields);
    return fields.length
      ? collections.push(collection.items)
      : collections.push(collection.data);
  });
  return collections;
}
