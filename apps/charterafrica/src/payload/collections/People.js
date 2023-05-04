import { PEOPLE_COLLECTION } from "../../lib/tools/models";
import slug from "../fields/slug";
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
      admin: {
        readOnly: true,
      },
    },
    {
      name: "fullName",
      type: "text",
      label: {
        en: "People Full Name",
        fr: "Nom complet de la personne",
        pt: "Nome completo da Pessoa",
      },
      admin: {
        readOnly: true,
      },
    },
    slug({ fieldToUse: "username" }),
    {
      name: "username",
      type: "text",
      label: {
        en: "People Username",
        fr: "Nom d'utilisateur de la personne",
        pt: "Nome de usuário da Pessoa",
      },
      admin: {
        readOnly: true,
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
      admin: {
        readOnly: true,
      },
    },
    {
      name: "type",
      type: "text",
      label: { en: "Type", fr: "Taper", pt: "Tipo" },
      admin: {
        readOnly: true,
      },
    },
    {
      name: "avatarUrl",
      type: "text",
      label: { en: "Avatar URL", fr: "URL d'avatar", pt: "URL de avatar" },
      admin: {
        readOnly: true,
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
      admin: {
        readOnly: true,
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
      admin: {
        readOnly: true,
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
      admin: {
        readOnly: true,
      },
    },
    {
      name: "email",
      type: "email",
      label: {
        en: "Email",
        fr: "Email",
        pt: "Email",
      },
      admin: {
        readOnly: true,
      },
    },
    {
      name: "lastActive",
      type: "date",
      label: {
        en: "Last Active",
        fr: "Dernier actif",
        pt: "ativo pela última vez",
      },
      admin: {
        readOnly: true,
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    updatedAt(),
  ],
};

export default People;
