import authors from "../fields/authors";
import content from "../fields/content";
import image from "../fields/image";
import publishedOn from "../fields/publishedOn";
import slug from "../fields/slug";
import tags from "../fields/tags";

const Posts = {
  slug: "posts",
  labels: {
    singular: "Post",
    plural: "Posts",
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
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
      label: "Title",
      required: true,
    },
    image({
      overrides: {
        name: "coverImage",
        label: "Cover Image",
      },
    }),
    content(),
    slug(),
    publishedOn(),
    tags({
      admin: {
        isSortable: true,
        position: "sidebar",
      },
    }),
    authors(),
    {
      name: "excerpt",
      label: "Excerpt",
      type: "textarea",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
  ],
};

export default Posts;
