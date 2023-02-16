import linkGroup from "../fields/linkGroup";
import richText from "../fields/richText";

const PageHeader = {
  slug: "page-header",
  fields: [
    richText({
      name: "title",
      label: {
        en: "Title",
        fr: "Titre",
        pt: "Título",
      },
      required: true,
      localized: true,
      admin: {
        elements: [],
        leaves: ["bold", "italic", "strikethrough", "underline"],
      },
    }),
    linkGroup({
      linkConfig: { required: false },
      overrides: { required: false },
    }),
    {
      name: "media",
      type: "group",
      label: {
        en: "Image",
        fr: "Image",
        pt: "Imagem",
      },
      required: true,
      fields: [
        {
          name: "image",
          label: {
            en: "Image",
            fr: "Image",
            pt: "Imagem",
          },
          type: "upload",
          relationTo: "media",
          required: true,
          filterOptions: {
            mimeType: { contains: "image" },
          },
        },
        {
          name: "align",
          label: {
            en: "Align",
          },
          type: "select",
          options: [
            {
              value: "0",
              label: "Start",
            },
            {
              value: "1",
              label: "End",
            },
          ],
          required: true,
          admin: {
            isClearable: true,
          },
        },
      ],
    },
  ],
};

export default PageHeader;
