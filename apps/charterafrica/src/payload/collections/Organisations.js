import { ORGANIZATION_COLLECTION } from "../../lib/tools/models";
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
      name: "avatarUrl",
      type: "text",
      label: { en: "Avatar URL", fr: "URL d'avatar", pt: "URL de avatar" },
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

export default Organisations;
