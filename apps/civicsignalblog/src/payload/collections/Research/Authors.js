import canRead from "#civicsignalblog/payload/access/applications/research";
import isAdminOrEditor from "#civicsignalblog/payload/access/isAdminOrEditor";

const Authors = {
  slug: "author",
  access: {
    read: canRead,
    update: isAdminOrEditor,
    create: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  admin: {
    defaultColumns: ["fullName", "updatedAt"],
    enableRichTextLink: false,
    group: "Publication",
    useAsTitle: "fullName",
  },
  fields: [
    {
      name: "fullName",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "bio",
      type: "textarea",
      localized: true,
    },
  ],
};

export default Authors;
