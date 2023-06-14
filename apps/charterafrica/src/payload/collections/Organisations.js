import {
  ORGANIZATION_COLLECTION,
  TOOL_COLLECTION,
} from "../../lib/ecosystem/models";
import dateField from "../fields/dateField";
import slug from "../fields/slug";
import source from "../fields/source";
import supporter from "../fields/supporter";

const Organisations = {
  slug: ORGANIZATION_COLLECTION,
  admin: {
    useAsTitle: "externalId",
    defaultColumns: ["externalId", "source", "name", "type"],
  },
  access: {
    read: () => true,
  },
  labels: {
    singular: {
      en: "Organisation",
      fr: "Organisation",
      pt: "Organização",
    },
    plural: {
      en: "Organisations",
      fr: "Organisations",
      pt: "Organizações",
    },
  },
  fields: [
    {
      name: "externalId",
      type: "text",

      label: { en: "External ID", fr: "ID externe", pt: "ID externo" },
      admin: {
        readOnly: true,
      },
    },
    {
      name: "name",
      type: "text",
      label: { en: "Name", fr: "Nom", pt: "Nome" },

      admin: {
        readOnly: true,
      },
    },
    // Can either be Non-Profit, For- Profit, Donor/ Investor, Charter Grantee
    {
      name: "type",
      type: "select",
      label: { en: "Type", fr: "Taper", pt: "Tipo" },
      options: [
        {
          value: "Academic and Research",
          label: {
            en: "Academic & Research",
            fr: "Recherche académique",
            pt: "Pesquisa acadêmica",
          },
        },
        {
          value: "Faith-based",
          label: {
            en: "Faith-Based",
            fr: "Confessionnel",
            pt: "Baseada na fé",
          },
        },
        {
          value: "For-profit",
          label: {
            en: "For-Profit",
            fr: "À but lucratif",
            pt: "Com fins lucrativos",
          },
        },
        {
          value: "Foundation",
          label: { en: "Foundation", fr: "Fondation", pt: "Fundação" },
        },
        {
          value: "Media",
          label: { en: "Media", fr: "Médias", pt: "meios de comunicação" },
        },
        {
          value: "Multilateral institution",
          label: {
            en: "Multilateral institution",
            fr: "Institution multilatérale",
            pt: "Instituição Multilateral",
          },
        },
        {
          value: "Network",
          label: { en: "Network", fr: "Réseau", pt: "Rede" },
        },
        {
          value: "Non-profit",
          label: {
            en: "Non-Profit",
            fr: "Non lucratif",
            pt: "Organização sem fins lucrativos",
          },
        },
      ],

      admin: {
        readOnly: true,
      },
    },
    slug({ fieldToUse: ["source", "externalId"] }),
    {
      name: "description",
      type: "textarea",
      label: {
        en: "Organization Description",
        fr: "Description de l'organisation",
        pt: "Descrição da organização",
      },
      localized: true,
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
      name: "location",
      type: "text",
      label: {
        en: "Organization Location",
        fr: "Lieu de l'organisation",
        pt: "Localização da organização",
      },
      localized: true,
      admin: {
        readOnly: true,
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
      admin: {
        readOnly: true,
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
      admin: {
        readOnly: true,
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
      admin: {
        readOnly: true,
      },
    },
    {
      name: "supporters",
      type: "array",
      admin: {
        readOnly: true,
        initCollapsed: true,
      },
      label: { en: "Supporters", fr: "Partisans", pt: "Apoiadores" },
      fields: supporter,
    },
    {
      name: "partners",
      type: "array",
      admin: {
        readOnly: true,
        initCollapsed: true,
      },
      label: { en: "Partners", fr: "Les partenaires", pt: "Parceiros" },
      fields: supporter,
    },
    {
      name: "tools",
      type: "relationship",
      hasMany: true,
      admin: {
        readOnly: true,
      },
      relationTo: TOOL_COLLECTION,
      label: { en: "Tools", fr: "Outils", pt: "Ferramentas" },
    },
    {
      name: "socialMedia",
      type: "array",
      admin: {
        readOnly: true,
        initCollapsed: true,
      },
      label: {
        en: "Other Social Media Pages (A list)",
        fr: "Autres pages de médias sociaux (une liste)",
        pt: "Outras páginas de mídia social (uma lista)",
      },
      fields: [
        {
          name: "name",
          type: "text",
          label: { en: "Name", fr: "Nom", pt: "Nome" },
        },
        {
          name: "link",
          type: "text",
          admin: {
            readOnly: true,
          },
          label: { en: "Link", fr: "Lien", pt: "Link" },
        },
      ],
    },
    {
      name: "airtableId",
      label: { en: "Airtable ID", fr: "ID Airtable", pt: "ID da Airtable" },
      type: "text",
      required: true,
    },
    source(),
    dateField({
      name: "updatedAt",
      hooks: {
        beforeValidate: [({ value }) => (value ? new Date(value) : new Date())],
      },
    }),
  ],
};

export default Organisations;
