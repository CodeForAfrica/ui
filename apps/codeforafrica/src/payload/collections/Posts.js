import authors from "../fields/authors";
import content from "../fields/content";
import image from "../fields/image";
import publishedOn from "../fields/publishedOn";
import slug from "../fields/slug";
import tags from "../fields/tags";

const Posts = {
  slug: "posts",
  labels: {
    singular: {
      en: "Post",
    },
    plural: {
      en: "Posts",
    },
  },
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ["title", "authors", "publishedOn"],
    description: "Stories and Opportunities",
    group: "Publication",
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    image({
      overrides: {
        name: "coverImage",
        required: true,
        localized: true,
      },
    }),
    content({ minRows: 1, required: true, localized: true }),
    slug(),
    publishedOn({ localized: true }),
    tags({
      admin: {
        isSortable: true,
        position: "sidebar",
      },
    }),
    authors({ localized: true }),
    {
      name: "excerpt",
      type: "textarea",
      required: true,
      localized: true,
      admin: {
        position: "sidebar",
      },
    },
  ],
  versions: {
    drafts: true,
  },
};

export default Posts;
