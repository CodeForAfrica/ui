import {
  TOOL_COLLECTION,
  ORGANIZATION_COLLECTION,
  PEOPLE_COLLECTION,
} from "../../lib/tools/models";
import source from "../fields/toolSourceField";
import updatedAt from "../fields/updatedAt";

const Tools = {
  slug: TOOL_COLLECTION,
  admin: {
    useAsTitle: "externalId",
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
    source(),
    {
      name: "externalId",
      type: "text",
      required: true,
      label: { en: "External ID", fr: "ID externe", pt: "ID externo" },
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
    {
      name: "description",
      type: "textarea",
      label: {
        en: "Tool Description",
        fr: "Description de l'outil",
        pt: "Descrição da ferramenta",
      },
    },
    {
      name: "link",
      type: "text",
      label: {
        en: "Tool Link",
        fr: "Lien de l'outil",
        pt: "Link da ferramenta",
      },
    },
    {
      name: "location",
      type: "text",
      label: {
        en: "Tool Location",
        fr: "Emplacement de l'outil",
        pt: "Localização da ferramenta",
      },
    },
    {
      name: "topic",
      type: "text",
      label: {
        en: "Topic",
        fr: "Sujet",
        pt: "Tópico",
      },
    },
    {
      name: "languagesTechSkills",
      type: "array",
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
      label: { en: "Avatar URL", fr: "URL d'avatar", pt: "URL de avatar" },
    },
    {
      name: "lastCommit",
      type: "json",
      label: {
        en: "Last Commit",
        fr: "Dernier commit",
        pt: "Último commit",
      },
    },
    {
      name: "stars",
      type: "number",
      label: {
        en: "Stars",
        fr: "Étoiles",
        pt: "Estrelas",
      },
    },
    {
      name: "views",
      type: "number",
      label: {
        en: "Views",
        fr: "Vues",
        pt: "Visualizações",
      },
    },
    {
      name: "forks",
      type: "number",
      label: {
        en: "Forks",
        fr: "Fourches",
        pt: "Forks",
      },
    },
    {
      name: "organisation",
      type: "relationship",
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
      relationTo: PEOPLE_COLLECTION,
      label: {
        en: "People",
        fr: "personnes",
        pt: "pessoas",
      },
    },
    updatedAt(),
  ],
};

export default Tools;
