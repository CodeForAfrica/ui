import authors from "../fields/authors";
import content from "../fields/content";
import publishedOn from "../fields/publishedOn";
import richText from "../fields/richText";
import slug from "../fields/slug";
import tags from "../fields/tags";

const Stories = {
  slug: "story",
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
    richText({
      name: "excerpt",
      label: "Excerpt",
      localized: true,
      admin: {
        elements: ["leaves"],
      },
    }),
    tags(),
    content(),
    publishedOn(),
  ],
};

export default Stories;
