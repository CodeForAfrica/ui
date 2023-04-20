import { PEOPLE_COLLECTION } from "../../lib/tools/models";
import source from "../fields/toolSourceField";
import updatedAt from "../fields/updatedAt";

const People = {
  slug: PEOPLE_COLLECTION,
  labels: {
    singular: {
      en: "People",
      fr: "People",
      pt: "Pessoas",
    },
    plural: {
      en: "People",
      fr: "People",
      pt: "Pessoas",
    },
  },
  admin: {
    useAsTitle: "externalId",
  },
  access: {
    read: () => true,
  },
  fields: [
    source(),
    {
      name: "externalId",
      type: "text",
      required: true,
      label: { en: "External ID", fr: "ID externe", pt: "ID externo" },
    },
    {
      name: "fullName",
      type: "text",
      label: {
        en: "People Full Name",
        fr: "Nom complet de la personne",
        pt: "Nome completo da Pessoa",
      },
    },
    {
      name: "username",
      type: "text",
      label: {
        en: "People Username",
        fr: "Nom d'utilisateur de la personne",
        pt: "Nome de usuário da Pessoa",
      },
    },
    {
      name: "description",
      type: "textarea",
      label: {
        en: "People Description",
        fr: "Description de la personne",
        pt: "Descrição da Pessoa",
      },
    },
    {
      name: "country",
      type: "text",
      label: {
        en: "People Country",
        fr: "Pays de la personne",
        pt: "País da Pessoa",
      },
    },
    {
      name: "twitter",
      type: "text",
      label: {
        en: "People Twitter",
        fr: "Twitter de la personne",
        pt: "Twitter da Pessoa",
      },
    },
    {
      name: "name",
      type: "text",
      label: {
        en: "Tool Name",
        fr: "Nom de l'outil",
        pt: "Nome da ferramenta",
      },
    },
    updatedAt(),
  ],
};

export default People;
