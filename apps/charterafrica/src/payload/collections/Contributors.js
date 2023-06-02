import { CONTRIBUTORS_COLLECTION } from "../../lib/ecosystem/models";
import airtableId from "../fields/airtableId";
import dateField from "../fields/dateField";
import slug from "../fields/slug";
import source from "../fields/source";

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
    source(),
    dateField({
      name: "updatedAt",
      hooks: {
        beforeValidate: [({ value }) => (value ? new Date(value) : new Date())],
      },
    }),
    airtableId(),
  ],
};

export default Contributors;
