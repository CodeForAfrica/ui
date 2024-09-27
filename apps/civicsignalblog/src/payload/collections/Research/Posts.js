import canRead from "@/civicsignalblog/payload/access/applications/research";
import authors from "@/civicsignalblog/payload/fields/authors";
import content from "@/civicsignalblog/payload/fields/content";
import image from "@/civicsignalblog/payload/fields/image";
import publishedOn from "@/civicsignalblog/payload/fields/publishedOn";
import slug from "@/civicsignalblog/payload/fields/slug";
import tags from "@/civicsignalblog/payload/fields/tags";
import formatDraftUrl from "@/civicsignalblog/payload/utils/formatDraftUrl";

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
    read: canRead,
  },
  admin: {
    defaultColumns: ["title", "authors", "publishedOn"],
    description: "Stories",
    group: "Publication",
    preview: (doc, options) => formatDraftUrl("posts/stories", doc, options),
    useAsTitle: "title",
    listSearchableFields: ["content", "excerpt"],
    livePreview: {
      // Assumed that all posts appear under posts/stories
      url: ({ data }) => {
        return `${process.env.PAYLOAD_PUBLIC_APP_URL}/posts/stories/${data.slug}`;
      },
    },
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
    drafts: {
      autosave: true,
    },
  },
};

export default Posts;
