import { ORGANIZATION_COLLECTION } from "../../lib/tools/models";
import slug from "../fields/slug";
import source from "../fields/toolSourceField";
import updatedAt from "../fields/updatedAt";

const Organisations = {
  slug: ORGANIZATION_COLLECTION,
  admin: {
    useAsTitle: "externalId",
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
    source(),
    {
      name: "externalId",
      type: "text",
      label: { en: "External ID", fr: "ID externe", pt: "ID externo" },
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: "name",
      type: "text",
      label: { en: "Name", fr: "Nom", pt: "Nome" },
      required: true,
      admin: {
        readOnly: true,
      },
    },
    slug({ fieldToUse: "name" }),
    {
      name: "description",
      type: "textarea",
      label: {
        en: "Organization Description",
        fr: "Description de l'organisation",
        pt: "Descrição da organização",
      },
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

export default Organisations;
