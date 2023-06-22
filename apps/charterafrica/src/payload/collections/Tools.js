import {
  allCountries,
  countriesByContinent,
} from "../../lib/data/json/countries";
import {
  TOOL_COLLECTION,
  CONTRIBUTORS_COLLECTION,
} from "../../lib/ecosystem/models";
import avatarUrl from "../fields/avatarUrl";
import dateField from "../fields/dateField";
import slug from "../fields/slug";
import source from "../fields/source";
import supporter from "../fields/supporter";

const Tools = {
  slug: TOOL_COLLECTION,
  admin: {
    useAsTitle: "externalId",
    defaultColumns: ["externalId", "name", "location", "source"],
  },
  access: {
    read: () => true,
  },
  labels: {
    singular: {
      en: "Tool",
      fr: "Outil",
      pt: "Ferramenta",
    },
    plural: {
      en: "Tools",
      fr: "Outils",
      pt: "Ferramentas",
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
    slug({ fieldToUse: ["source", "name"] }),
    {
      name: "name",
      type: "text",
      label: {
        en: "Tool Name",
        fr: "Nom de l'outil",
        pt: "Nome da ferramenta",
      },
      admin: {
        readOnly: true,
      },
    },
    {
      name: "description",
      type: "textarea",
      admin: {
        readOnly: true,
      },
      localized: true,
      label: {
        en: "Tool Description",
        fr: "Description de l'outil",
        pt: "Descrição da ferramenta",
      },
    },
    {
      name: "link",
      type: "text",
      admin: {
        readOnly: true,
      },
      label: {
        en: "Tool Link",
        fr: "Lien de l'outil",
        pt: "Link da ferramenta",
      },
    },
    {
      name: "repoLink",
      type: "text",
      admin: {
        readOnly: true,
      },
      label: {
        en: "Repo Link",
        fr: "Lien de réapprovisionnement",
        pt: "Link repo",
      },
    },
    {
      name: "operatingCountries",
      type: "select",
      options: countriesByContinent("Africa"),
      label: {
        en: "Operating Countries",
        fr: "Pays opérationnels",
        pt: "Países operacionais",
      },
      hasMany: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: "theme",
      type: "text",
      admin: {
        readOnly: true,
      },
      localized: true,
      label: { en: "Theme", fr: "Thème", pt: "Tema" },
    },
    {
      name: "techSkills",
      type: "array",
      admin: {
        readOnly: true,
        initCollapsed: true,
      },
      label: {
        en: "Languages / Tech skills",
        fr: "Langues / Compétences techniques",
        pt: "Linguagens / Habilidades técnicas",
      },
      fields: [
        {
          name: "language",
          type: "text",
          label: { en: "Language", fr: "Langue", pt: "Linguagem" },
          required: true,
        },
      ],
    },
    avatarUrl(),
    {
      name: "lastCommit",
      type: "group",
      admin: {
        readOnly: true,
      },
      label: {
        en: "Last Commit",
        fr: "Dernier commit",
        pt: "Último commit",
      },
      fields: [
        {
          name: "message",
          type: "text",
          admin: {
            readOnly: true,
          },
          label: { en: "Message", fr: "Message", pt: "Mensagem" },
        },
        {
          name: "author",
          type: "text",
          admin: {
            readOnly: true,
          },
          label: { en: "author", fr: "auteur", pt: "autor" },
        },
        {
          name: "committedDate",
          type: "date",
          admin: {
            readOnly: true,
            date: {
              pickerAppearance: "dayAndTime",
            },
          },
          label: {
            en: "Comitted Date",
            fr: "Date d'arrivée",
            pt: "Data emodificada",
          },
        },
      ],
    },
    {
      name: "stars",
      type: "number",
      admin: {
        readOnly: true,
      },
      label: {
        en: "Stars",
        fr: "Étoiles",
        pt: "Estrelas",
      },
    },
    {
      name: "views",
      type: "number",
      admin: {
        readOnly: true,
      },
      label: {
        en: "Views",
        fr: "Vues",
        pt: "Visualizações",
      },
    },
    {
      name: "forks",
      type: "number",
      admin: {
        readOnly: true,
      },
      label: {
        en: "Forks",
        fr: "Fourches",
        pt: "Forks",
      },
    },
    {
      name: "contributors",
      type: "relationship",
      hasMany: true,
      admin: {
        readOnly: true,
      },
      relationTo: CONTRIBUTORS_COLLECTION,
      label: { en: "Contributors", fr: "Contributeurs", pt: "Colaboradores" },
    },
    {
      name: "sourceUpdatedAt",
      type: "date",
      admin: {
        readOnly: true,
        date: {
          pickerAppearance: "dayAndTime",
        },
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
      name: "homeCountry",
      type: "select",
      options: allCountries,
      label: { en: "Home Country", fr: "Pays natal", pt: "País natal" },
      admin: {
        readOnly: true,
      },
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
    dateField({
      name: "updatedAt",
      hooks: {
        beforeValidate: [({ value }) => (value ? new Date(value) : new Date())],
      },
    }),
    {
      name: "airtableId",
      label: { en: "Airtable ID", fr: "ID Airtable", pt: "ID da Airtable" },
      type: "text",
      required: true,
    },
    dateField({
      name: "deletedAt",
    }),
    source(),
  ],
};

export default Tools;
