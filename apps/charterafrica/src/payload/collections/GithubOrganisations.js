import updatedAt from "../fields/updatedAt";

const GithubOrganisations = {
  slug: "github-organisations",
  admin: {
    useAsTitle: "github",
  },
  access: {
    read: () => true,
  },
  labels: {
    singular: {
      en: "Github Organisation",
      fr: "Organisation GitHub",
      pt: "Organização do GitHub",
    },
    plural: {
      en: "Github Organisations",
      fr: "Organisations GitHub",
      pt: "Organizações do Github",
    },
  },
  fields: [
    {
      name: "github",
      type: "text",
      label: {
        en: "GitHub Organization",
        fr: "Organisation GitHub",
        pt: "Organização GitHub",
      },
      required: true,
    },
    {
      name: "type",
      type: "text",
      label: {
        en: "Type",
        fr: "Type",
        pt: "Tipo",
      },
    },
    {
      name: "name",
      type: "text",
      label: {
        en: "Organization Name",
        fr: "Nom de l'organisation",
        pt: "Nome da organização",
      },
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      label: {
        en: "Organization Description",
        fr: "Description de l'organisation",
        pt: "Descrição da organização",
      },
    },
    {
      name: "location",
      type: "text",
      label: {
        en: "Organization Location",
        fr: "Lieu de l'organisation",
        pt: "Localização da organização",
      },
    },
    {
      name: "website",
      type: "text",
      label: {
        en: "Organization Website",
        fr: "Site web de l'organisation",
        pt: "Website da organização",
      },
    },
    {
      name: "twitter",
      type: "text",
      label: {
        en: "Organization Twitter",
        fr: "Twitter de l'organisation",
        pt: "Twitter da organização",
      },
    },
    {
      name: "email",
      type: "email",
      label: {
        en: "Organization Email",
        fr: "Email de l'organisation",
        pt: "Email da organização",
      },
    },
    updatedAt(),
  ],
};

export default GithubOrganisations;
