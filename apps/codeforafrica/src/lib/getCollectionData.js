import { getCollectionSlugs, getCollectionBySlug } from "./utils";

export default function getCollectionData(collectionDir, fields = []) {
  const slugs = getCollectionSlugs(collectionDir);
  const collections = slugs.reduce((acc, slug) => {
    const collection = getCollectionBySlug(collectionDir, slug, fields);
    return fields.length
      ? acc.concat(collection.items)
      : acc.concat(collection.data);
  }, []);
  return collections;
}
