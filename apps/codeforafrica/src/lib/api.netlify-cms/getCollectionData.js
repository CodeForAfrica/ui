import { getCollectionSlugs, getCollectionBySlug } from "./utils";

export default function getCollectionData(collectionDir, fields = []) {
  const slugs = getCollectionSlugs(collectionDir);
  const collections = slugs.map((slug) => {
    const collection = getCollectionBySlug(collectionDir, slug, fields);
    return fields.length ? collection.items : collection.data;
  });
  return collections;
}
