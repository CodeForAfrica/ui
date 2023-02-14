import linkGroup from "../fields/linkGroup";
import richText from "../fields/richText";

const Error = {
  slug: "error",
  labels: {
    singular: {
      en: "Error",
      fr: "Erreur",
      pt: "Erro",
    },
    plural: {
      en: "Errors",
      fr: "Les Erreurs",
      pt: "Erros",
    },
  },
  fields: [
    {
      name: "statusCode",
      label: {
        en: "Status Code",
        fr: "Code d'état",
        pt: "Código de estado",
      },
      type: "number",
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

export default Error;
