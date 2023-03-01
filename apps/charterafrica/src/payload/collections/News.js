import fields from "../fields/post";

const News = {
  slug: "news",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "author", "publishedOn"],
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  fields,
};

export default News;
