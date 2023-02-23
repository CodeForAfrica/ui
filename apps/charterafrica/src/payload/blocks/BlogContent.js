import blockFields from "../fields/blockFields";
import richText from "../fields/richText";

const BlogContent = {
  slug: "blogContent",
  fields: [
    blockFields({
      name: "blogContentFields",
      fields: [richText({ name: "content", admin: { elements: ["ul"] } })],
    }),
  ],
};

export default BlogContent;
