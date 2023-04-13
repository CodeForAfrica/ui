import updatedAt from "../fields/updatedAt";

const Tools = {
  slug: "tool-github",
  admin: {
    useAsTitle: "toolName",
  },
  labels: {
    singular: {
      en: "Tool Github",
      fr: "Outil github",
      pt: "Ferramenta github",
    },
    plural: {
      en: "Tools Github",
      fr: "Outils GitHub",
      pt: "Ferramentas github",
    },
  },
  fields: [
    {
      name: "toolGithub",
      type: "text",
      required: true,
      label: {
        en: "Tool GitHub",
        fr: "Outil GitHub",
        pt: "Ferramenta GitHub",
      },
    },
    {
      name: "toolName",
      type: "text",
      label: {
        en: "Tool Name",
        fr: "Nom de l'outil",
        pt: "Nome da ferramenta",
      },
    },
    {
      name: "toolDescription",
      type: "textarea",
      label: {
        en: "Tool Description",
        fr: "Description de l'outil",
        pt: "Descrição da ferramenta",
      },
    },
    {
      name: "toolLink",
      type: "text",
      label: {
        en: "Tool Link",
        fr: "Lien de l'outil",
        pt: "Link da ferramenta",
      },
    },
    {
      name: "toolLocation",
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
      relationTo: "github-organisations",
      label: {
        en: "Github Organisation",
        fr: "Organisation GitHub",
        pt: "Organizaçõ do Github",
      },
    },
    {
      name: "people",
      type: "relationship",
      hasMany: true,
      relationTo: "github-people",
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
