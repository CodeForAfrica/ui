import authors from "../fields/authors";
import content from "../fields/content";
import publishedOn from "../fields/publishedOn";
import slug from "../fields/slug";
import tags from "../fields/tags";

const Articles = {
  slug: "article",
  labels: {
    singular: "Story",
    plural: "Stories",
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "authors", "publishedOn"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Title",
      required: true,
    },
    slug(),
    authors(),
    {
      name: "coverImage",
      label: "Cover Image",
      type: "upload",
      relationTo: "media",
      required: true,
      filterOptions: {
        mimeType: { contains: "image" },
      },
    },
    {
      name: "excerpt",
      label: "Excerpt",
      type: "text",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    tags({
      admin: {
        position: "sidebar",
      },
    }),
    content(),
    publishedOn(),
  ],
};

export default Articles;
