import linkGroup from "../fields/linkGroup";
import richText from "../fields/richText";

const HelpdeskPageContent = {
  slug: "helpdesk-page-content",
  fields: [
    richText({
      name: "description",
      label: {
        en: "Description",
        fr: "La description",
        pt: "Descrição",
      },
      admin: {
        elements: ["h2", "h3", "h4", "h5", "h6", "link", "ol", "ul", "indent"],
        leaves: ["bold", "code", "italic", "strikethrough", "underline"],
      },
      localized: true,
    }),
    linkGroup(),
  ],
};

export default HelpdeskPageContent;
