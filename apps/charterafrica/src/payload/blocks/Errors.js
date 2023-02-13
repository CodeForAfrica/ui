import linkGroup from "../fields/linkGroup";
import richText from "../fields/richText";

const Errors = {
  slug: "errors",
  fields: [
    {
      name: "statusCode",
      label: {
        en: "Status Code",
        fr: "Code d'état",
        pt: "Código de estado",
      },
      type: "number",
      localized: true,
      required: true,
      unique: true,
    },
    {
      name: "title",
      label: {
        en: "Title",
        fr: "Titre",
        pt: "Título",
      },
      type: "text",
      localized: true,
      required: true,
    },
    richText({
      name: "description",
      label: {
        en: "Description",
        fr: "La description",
        pt: "Descrição",
      },
      localized: true,
      required: true,
      admin: {
        elements: [],
      },
    }),
    linkGroup(),
  ],
};

export default Errors;
