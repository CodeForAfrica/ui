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
    {
      name: "variant",
      type: "radio",
      options: [
        {
          label: {
            en: "Logo",
            fr: "Logo",
            pt: "Logótipo",
          },
          value: "logo",
        },
        {
          label: {
            en: "Image",
            pt: "Imagem",
            fr: "Image",
          },
          value: "image",
        },
      ],
      defaultValue: "image",
    },
    richText({
      name: "description",
      label: {
        en: "Description",
        fr: "La description",
        pt: "Descrição",
      },
      localized: true,
      admin: {
        condition: (_, siblingData) => siblingData?.variant === "image",
        elements: [],
        leaves: ["bold", "italic", "strikethrough", "underline"],
      },
    }),
    linkGroup({
      linkConfig: { disableOpenInNewTab: true, required: false },
      overrides: {
        required: false,
        localized: true,
        admin: {
          condition: (_, siblingData) => siblingData?.variant === "image",
        },
      },
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
              value: "start",
              label: "Start",
            },
            {
              value: "end",
              label: "End",
            },
          ],
          required: true,
          admin: {
            isClearable: true,
          },
        },
      ],
      admin: {
        condition: (_, siblingData) => siblingData?.variant === "image",
      },
    },
    {
      name: "logo",
      label: {
        en: "Logo",
        fr: "Logo",
        pt: "Logótipo",
      },
      type: "upload",
      relationTo: "media",
      required: true,
      filterOptions: {
        mimeType: { contains: "image" },
      },
      admin: {
        condition: (_, siblingData) => siblingData?.variant === "logo",
      },
    },
  ],
};

export default PageHeader;
