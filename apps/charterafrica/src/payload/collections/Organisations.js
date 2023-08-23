import avatarUrl from "../fields/avatarUrl";
import dateField from "../fields/dateField";
import slug from "../fields/slug";
import source from "../fields/source";
import supporter from "../fields/supporter";
import { ORGANIZATION_COLLECTION, TOOL_COLLECTION } from "../utils/collections";

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
      required: true,
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
      type: "text",
      label: { en: "Type", fr: "Taper", pt: "Tipo" },
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
    avatarUrl(),
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
    {
      type: "text",
      label: { en: "E Tag", fr: "Étiquette", pt: "E tag" },
      name: "eTag",
      admin: {
        readOnly: true,
        position: "sidebar",
      },
    },
  ],
};

export default Organisations;
