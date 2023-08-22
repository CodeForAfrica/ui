import avatarUrl from "../fields/avatarUrl";
import dateField from "../fields/dateField";
import slug from "../fields/slug";
import source from "../fields/source";
import { CONTRIBUTORS_COLLECTION } from "../utils/collections";
import mapLinkAndNameforContributorsInToolsCollection from "../utils/mapLinkAndNameforContributorsInToolsCollection";

const Contributors = {
  slug: CONTRIBUTORS_COLLECTION,
  labels: {
    singular: { en: "Contributor", fr: "Donateur", pt: "Contribuinte" },
    plural: { en: "Contributors", fr: "Contributeurs", pt: "Colaboradores" },
  },
  admin: {
    useAsTitle: "externalId",
    defaultColumns: ["externalId", "fullName", "location", "source"],
  },
  access: {
    read: () => true,
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
      name: "fullName",
      type: "text",
      label: {
        en: "Full Name",
        fr: "Nom complet de la personne",
        pt: "Nome completo da Pessoa",
      },
      admin: {
        readOnly: true,
      },
    },
    {
      name: "description",
      type: "textarea",
      label: {
        en: "Description",
        fr: "Description de la personne",
        pt: "Descrição da Pessoa",
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
      label: { en: "Location", fr: "Emplacement", pt: "Localização" },
      admin: {
        readOnly: true,
      },
    },
    {
      name: "twitter",
      type: "text",
      label: {
        en: "Twitter handle",
        fr: "Twitter de la personne",
        pt: "Twitter da Pessoa",
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
    slug({ fieldToUse: ["source", "externalId"] }),
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
  hooks: {
    afterRead: [mapLinkAndNameforContributorsInToolsCollection],
  },
};

export default Contributors;
