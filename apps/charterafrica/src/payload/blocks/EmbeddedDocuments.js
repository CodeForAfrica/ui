import { slateEditor } from "@payloadcms/richtext-slate";

import documentCloudSource from "../fields/documentCloudSource";
import richText from "../fields/richText";

const EmbeddedDocuments = {
  slug: "embedded-documents",
  fields: [
    {
      type: "collapsible",
      label: {
        en: "Title & Description",
        fr: "Titre & description",
        pt: "Titulo & descrição",
      },
      fields: [
        {
          name: "title",
          label: {
            en: "Title",
            fr: "Titre",
            pt: "Título",
          },
          type: "text",
          localized: true,
        },
        richText({
          name: "description",
          label: {
            en: "Description",
            fr: "La description",
            pt: "Descrição",
          },
          localized: true,
          editor: slateEditor({
            admin: {
              elements: ["h3", "h4", "h5", "h6", "link", "ol", "ul", "indent"],
              leaves: ["bold", "code", "italic", "underline"],
            },
          }),
        }),
      ],
    },
    {
      type: "collapsible",
      label: {
        en: "Source",
      },
      fields: [
        documentCloudSource({
          overrides: {
            name: "group",
            label: {
              en: "Documents Group",
              fr: "Groupe de documents",
              pt: "Grupo de documentos",
            },
          },
        }),
      ],
    },
  ],
};

export default EmbeddedDocuments;
