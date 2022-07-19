import fs from "fs";
import { join } from "path";

import matter from "gray-matter";
import { marked } from "marked";

import mappings from "./mappings";

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
    } else {
      items[field] = data[field] || "";
    }
  });
  mappings.forEach((mapping) => {
    if (fullPath.includes(mapping.matchBy)) {
      mapping.fields.forEach((field) => {
        if (typeof field === "object") {
          Object.keys(field).forEach((f) => {
            field[f].fields.forEach((y) => {
              data[f][y] = marked(data[f][y]);
            });
          });
        } else {
          data[field] = marked(data[field]);
          items[field] = data[field];
        }
      });
    }
  });
  return { items, data }; // return data just incase the caller needs to access its contents
};
