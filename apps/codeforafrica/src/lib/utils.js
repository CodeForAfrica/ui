import fs from "fs";
import { join } from "path";

import matter from "gray-matter";

export const getCollectionSlugs = (collectionDir) => {
  return fs.readdirSync(collectionDir);
};

export const getCollectionBySlug = (collectionDir, slug, fields = []) => {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(collectionDir, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const items = {};
  fields.forEach((field) => {
    if (field === "content") {
      items[field] = content;
    } else {
      items[field] = data[field];
    }
  });
  return { items, data }; // return data just incase the caller needs to access its contents
};
