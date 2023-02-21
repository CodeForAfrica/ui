import fields from "../fields/post";

const News = {
  slug: "news",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "author"],
  },
  versions: {
    drafts: true,
  },
  fields,
};

export default News;
