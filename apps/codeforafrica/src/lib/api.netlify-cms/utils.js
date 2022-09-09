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

  const markedContent = marked(content);

  data.slug = realSlug;
  data.content = markedContent;

  const items = fields?.reduce((acc, curr) => {
    if (curr === "content") {
      acc.content = markedContent;
    } else if (curr === "slug") {
      acc.slug = realSlug;
    } else {
      // The slug field above works for folder-based collections e.g. impact
      // but not for file-based collections e.g. get-in-touch in about.
      // Since field names are guaranteed to be unique (in page) and are set
      // in config, we can set the slug to be field name in file-based
      // collections
      let currData = data[curr] || null;
      if (currData?.constructor === Object && fields.includes("slug")) {
        currData = { slug: curr, ...currData };
      }
      acc[curr] = currData;
    }
    return acc;
  }, {});

  return { items, data }; // return data which can be used as default incase of no fields
}
