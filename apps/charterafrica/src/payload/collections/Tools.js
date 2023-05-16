import {
  TOOL_COLLECTION,
  ORGANIZATION_COLLECTION,
  PEOPLE_COLLECTION,
} from "../../lib/tools/models";
import deletedAt from "../fields/deletedAt";
import slug from "../fields/slug";
import source from "../fields/toolSourceField";
import updatedAt from "../fields/updatedAt";

const Tools = {
  slug: TOOL_COLLECTION,
  admin: {
    useAsTitle: "externalId",
    defaultColumns: ["externalId", "name", "location", "description"],
  },
  access: {
    read: () => true,
  },
  labels: {
    singular: {
      en: "Tool",
      fr: "Outil",
      pt: "Ferramenta",
    },
    plural: {
      en: "Tools",
      fr: "Outils",
      pt: "Ferramentas",
    },
  },
  fields: [
    {
      name: "externalId",
      type: "text",
      required: true,
      label: { en: "External ID", fr: "ID externe", pt: "ID externo" },
      admin: {
        readOnly: true,
      },
    },
    slug({ fieldToUse: ["source", "name"] }),
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
      name: "description",
      type: "textarea",
      admin: {
        readOnly: true,
      },
      label: {
        en: "Tool Description",
        fr: "Description de l'outil",
        pt: "Descrição da ferramenta",
      },
    },
    {
      name: "link",
      type: "text",
      admin: {
        readOnly: true,
      },
      label: {
        en: "Tool Link",
        fr: "Lien de l'outil",
        pt: "Link da ferramenta",
      },
    },
    {
      name: "location",
      type: "text",
      admin: {
        readOnly: true,
      },
      label: {
        en: "Tool Location",
        fr: "Emplacement de l'outil",
        pt: "Localização da ferramenta",
      },
    },
    {
      name: "subject",
      type: "text",
      admin: {
        readOnly: true,
      },
      label: { en: "Subject", fr: "Sujet", pt: "Assunto" },
    },
    {
      name: "techSkills",
      type: "array",
      admin: {
        readOnly: true,
        initCollapsed: true,
      },
      label: {
        en: "Languages / Tech skills",
        fr: "Langues / Compétences techniques",
        pt: "Linguagens / Habilidades técnicas",
      },
      fields: [
        {
          name: "language",
          type: "text",
          label: { en: "Language", fr: "Langue", pt: "Linguagem" },
          required: true,
        },
      ],
    },
    {
      name: "avatarUrl",
      type: "text",
      admin: {
        readOnly: true,
      },
      label: { en: "Avatar URL", fr: "URL d'avatar", pt: "URL de avatar" },
    },
    {
      name: "lastCommit",
      type: "json",
      admin: {
        readOnly: true,
      },
      label: {
        en: "Last Commit",
        fr: "Dernier commit",
        pt: "Último commit",
      },
    },
    {
      name: "stars",
      type: "number",
      admin: {
        readOnly: true,
      },
      label: {
        en: "Stars",
        fr: "Étoiles",
        pt: "Estrelas",
      },
    },
    {
      name: "views",
      type: "number",
      admin: {
        readOnly: true,
      },
      label: {
        en: "Views",
        fr: "Vues",
        pt: "Visualizações",
      },
    },
    {
      name: "forks",
      type: "number",
      admin: {
        readOnly: true,
      },
      label: {
        en: "Forks",
        fr: "Fourches",
        pt: "Forks",
      },
    },
    {
      name: "organisation",
      type: "relationship",
      admin: {
        readOnly: true,
      },
      relationTo: ORGANIZATION_COLLECTION,
      label: {
        en: "Organisation",
        fr: "Organisation",
        pt: "Organização",
      },
    },
    {
      name: "people",
      type: "relationship",
      hasMany: true,
      admin: {
        readOnly: true,
      },
      relationTo: PEOPLE_COLLECTION,
      label: {
        en: "People",
        fr: "personnes",
        pt: "pessoas",
      },
    },
    {
      name: "externalUpdatedAt",
      type: "date",
      admin: {
        readOnly: true,
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    updatedAt(),
    deletedAt(),
    source(),
  ],
};

export default Tools;
