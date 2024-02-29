import avatarUrl from "../fields/avatarUrl";
import dateField from "../fields/dateField";
import slug from "../fields/slug";
import source from "../fields/source";
import {
  CONTRIBUTORS_COLLECTION,
  ORGANIZATION_COLLECTION,
} from "../utils/collections";
import nestCollectionUnderPage from "../utils/nestCollectionUnderPage";

function useFullNameOrExternalId({ doc }) {
  if (doc) {
    const name = doc.name ?? doc.fullName ?? doc.externalId ?? null;
    return { ...doc, name };
  }
  return doc;
}

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
      name: "role",
      type: "text",
      label: { en: "Role", fr: "Rôle", pt: "Função" },
      admin: {
        readOnly: true,
      },
    },
    {
      name: "currentOrganisation",
      type: "text",
      label: {
        en: "Current Organization",
        fr: "Organisation actuelle",
        pt: "Organização atual",
      },
      admin: {
        readOnly: true,
      },
    },
    {
      name: "classification",
      type: "text",
      admin: {
        readOnly: true,
      },
      localized: true,
      label: {
        en: "Collection",
        fr: "Collection",
        pt: "Coleção",
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
    {
      name: "organisations",
      type: "relationship",
      hasMany: true,
      admin: {
        readOnly: true,
      },
      relationTo: ORGANIZATION_COLLECTION,
      label: {
        en: "Organizations",
        fr: "Organisations",
        pt: "Organizações",
      },
    },
    {
      name: "repositories",
      type: "array",
      admin: {
        readOnly: true,
        initCollapsed: true,
      },
      label: {
        en: "Repositories",
        fr: "Dépôts",
        pt: "Repositórios",
      },
      fields: [
        {
          name: "name",
          type: "text",
          label: { en: "Name", fr: "Nom", pt: "Nome" },
        },
        {
          name: "description",
          type: "textarea",
          label: { en: "Description", fr: "Description", pt: "Descrição" },
        },
        {
          name: "stargazers",
          type: "number",
          label: { en: "Stargazers", fr: "Stargazers", pt: "Stargazers" },
        },
        {
          name: "visibility",
          type: "text",
          label: { en: "Visibility", fr: "Visibilité", pt: "Visibilidade" },
        },
        {
          name: "url",
          type: "text",
          label: { en: "URL", fr: "URL", pt: "URL" },
        },
        {
          name: "techSkills",
          type: "text",
          label: {
            en: "Tech Skills",
            fr: "Compétences techniques",
            pt: "Habilidades técnicas",
          },
        },
        {
          name: "updatedAt",
          type: "date",
          label: {
            en: "Updated At",
            fr: "Mis à jour",
            pt: "Atualizado em",
          },
        },
      ],
    },
  ],
  hooks: {
    afterRead: [
      nestCollectionUnderPage("contributors"),
      useFullNameOrExternalId,
    ],
  },
};

export default Contributors;
