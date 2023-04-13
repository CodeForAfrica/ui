import updatedAt from "../fields/updatedAt";

const GithubPeople = {
  slug: "github-people",
  labels: {
    singular: {
      en: "Github People",
      fr: "Github People",
      pt: "Pessoas do Github",
    },
    plural: {
      en: "Github People",
      fr: "Github People",
      pt: "Pessoas do Github",
    },
  },
  admin: {
    useAsTitle: "peopleGitHub",
  },
  fields: [
    {
      name: "peopleGitHub",
      type: "text",
      required: true,
      label: {
        en: "People GitHub",
        fr: "Personne GitHub",
        pt: "GitHub da Pessoa",
      },
    },
    {
      name: "peopleFullName",
      type: "text",
      label: {
        en: "People Full Name",
        fr: "Nom complet de la personne",
        pt: "Nome completo da Pessoa",
      },
    },
    {
      name: "peopleUsername",
      type: "text",
      label: {
        en: "People Username",
        fr: "Nom d'utilisateur de la personne",
        pt: "Nome de usuário da Pessoa",
      },
    },
    {
      name: "peopleDescription",
      type: "textarea",
      label: {
        en: "People Description",
        fr: "Description de la personne",
        pt: "Descrição da Pessoa",
      },
    },
    {
      name: "peopleCountry",
      type: "text",
      label: {
        en: "People Country",
        fr: "Pays de la personne",
        pt: "País da Pessoa",
      },
    },
    {
      name: "peopleTwitter",
      type: "text",
      label: {
        en: "People Twitter",
        fr: "Twitter de la personne",
        pt: "Twitter da Pessoa",
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
    updatedAt(),
  ],
};

export default GithubPeople;
