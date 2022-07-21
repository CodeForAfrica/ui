import fs from "fs";
import { join } from "path";

import matter from "gray-matter";
import { marked } from "marked";

export function getCollectionSlugs(collectionDir) {
  return fs.readdirSync(collectionDir);
}

export function getCollectionBySlug(collectionDir, slug, fields) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(collectionDir, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items = fields?.reduce((acc, curr) => {
    if (curr === "content") {
      acc.content = marked(content);
    } else if (curr === "slug") {
      acc.slug = realSlug;
    } else {
      acc[curr] = data[curr] || null;
    }
    return acc;
  }, {});
  return { items, data }; // return data which can be used as default incase of no fields
}
