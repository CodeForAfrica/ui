import fs from "fs";
import { join } from "path";

import matter from "gray-matter";
import { marked } from "marked";

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
      items.description = marked(content);
    } else if (field === "slug") {
      items.slug = realSlug;
    } else {
      items[field] = data[field] || null;
    }
  });

  return { items, data }; // return data just incase the caller needs to access its contents
};
