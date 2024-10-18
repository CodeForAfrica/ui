import canRead from "#civicsignalblog/payload/access/applications/research";
import isAdminOrEditor from "#civicsignalblog/payload/access/isAdminOrEditor";
import slug from "#civicsignalblog/payload/fields/slug/index";

const Tags = {
  slug: "tag",
  admin: {
    defaultColumns: ["name", "updatedAt"],
    enableRichTextLink: false,
    group: "Publication",
    useAsTitle: "name",
  },
  access: {
    read: canRead,
    update: isAdminOrEditor,
    create: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    {
      name: "name",
      type: "text",
      unique: true,
      required: true,
      localized: true,
    },
    slug({ fieldToUse: "name" }),
  ],
};

export default Tags;
