import { ORGANIZATION_COLLECTION } from "../../lib/ecosystem/models";
import donors from "../fields/donorsField";
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
      required: true,
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
          label: {
            en: "For-Profit",
            fr: "À but lucratif",
            pt: "Com fins lucrativos",
          },
          value: "For-Profit",
        },
        {
          label: {
            en: "Non-Profit",
            fr: "Non lucratif",
            pt: "Organização sem fins lucrativos",
          },
          value: "Non-Profit",
        },
        {
          label: {
            en: "Donor/ Investor",
            fr: "Donateur / investisseur",
            pt: "Doador/ investidor",
          },
          value: "Donor/ Investor",
        },
        {
          value: "Charter Grantee",
          label: {
            en: "Charter Grantee",
            fr: "Accumulé",
            pt: "Charter donatel",
          },
        },
      ],
      required: true,
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
    donors(),
    source(),
    updatedAt(),
  ],
};

export default Organisations;
