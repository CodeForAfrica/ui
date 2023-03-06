import { deepmerge } from "@mui/utils";

export const defaultValue =
  (translation) =>
  ({ locale }) =>
    translation[locale];

const events = [
  {
    type: "text",
    label: {
      en: "Title",
      fr: "Titre",
      pt: "Título",
    },
    name: "title",
    defaultValue: defaultValue({
      en: "Events",
      fr: "Événements",
      pt: "Eventos",
    }),
    admin: {
      description: "Title to show on list of Events. Defaults to Events",
    },
    localized: true,
  },
  {
    type: "text",
    label: {
      en: "Show All Text",
      fr: "Afficher tout le texte",
      pt: "Mostre todo o texto",
    },
    name: "showAllText",
    defaultValue: defaultValue({
      en: "Show All",
      fr: "Afficher tout",
      pt: "Mostre tudo",
    }),
    admin: {
      description: "Used to toggle number of visible cards",
    },
    localized: true,
  },
  {
    type: "text",
    label: {
      en: "Show Less Text",
      fr: "Montrer moins de texte",
      pt: "Mostre menos texto",
    },
    name: "showLessText",
    defaultValue: defaultValue({
      en: "Show Less",
      fr: "Montrer moins",
      pt: "Mostre menos",
    }),
    admin: {
      description: "Used to toggle number of visible cards",
    },
    localized: true,
  },
  {
    type: "text",
    label: {
      en: "Date Text",
      fr: "Date SMS",
      pt: "Texto da data",
    },
    name: "dateText",
    localized: true,

    admin: {
      description: "Text to show on a siggle events card e.g deadline",
    },
    defaultValue: defaultValue({
      en: "Deadline",
      fr: "Date limite",
      pt: "Prazo final",
    }),
  },
  {
    type: "select",
    label: {
      en: "Status to show on mobile",
      fr: "Statut à afficher sur mobile",
      pt: "Status para mostrar no celular",
    },
    hasMany: true,
    options: [
      {
        label: {
          en: "Upcoming",
          fr: "A venir",
          pt: "Por vir",
        },
        value: "upcoming",
      },
      {
        label: {
          en: "Past",
          fr: "Passé",
          pt: "Passado",
        },
        value: "past",
      },
    ],
    name: "showOnMobile",
    localized: true,

    defaultValue: defaultValue({
      en: ["upcoming", "past"],
      fr: ["upcoming", "past"],
      pt: ["upcoming", "past"],
    }),
    admin: {
      description: "Statuses to display on mobile",
    },
  },
  {
    type: "text",
    label: {
      en: "Status Group Title Suffix",
      fr: "Suffixe de titre de groupe de statut",
      pt: "Sufixo do título do grupo de status",
    },
    name: "statusGroupTitleSuffix",
    admin: {
      description: "Additional text on status title",
    },
    defaultValue: defaultValue({
      en: "",
      fr: "",
      pt: "",
    }),
    localized: true,
  },
];

const fellowships = [
  {
    type: "text",
    label: {
      en: "Title",
      fr: "Titre",
      pt: "Título",
    },
    name: "title",
    defaultValue: defaultValue({
      en: "Fellowships",
      fr: "Bourses",
      pt: "Bolsas",
    }),
    admin: {
      description:
        "Title to show on list of fellowships. Defaults to fellowships",
    },
    localized: true,
  },
  {
    type: "text",
    label: {
      en: "Show All Text",
      fr: "Afficher tout le texte",
      pt: "Mostre todo o texto",
    },
    name: "showAllText",
    defaultValue: defaultValue({
      en: "Show All",
      fr: "Afficher tout",
      pt: "Mostre tudo",
    }),
    admin: {
      description: "Used to toggle number of visible cards",
    },
    localized: true,
  },
  {
    type: "text",
    label: {
      en: "Show Less Text",
      fr: "Montrer moins de texte",
      pt: "Mostre menos texto",
    },
    name: "showLessText",
    defaultValue: defaultValue({
      en: "Show Less",
      fr: "Montrer moins",
      pt: "Mostre menos",
    }),
    admin: {
      description: "Used to toggle number of visible cards",
    },
    localized: true,
  },
  {
    type: "text",
    label: {
      en: "Date Text",
      fr: "Date SMS",
      pt: "Texto da data",
    },
    name: "dateText",
    localized: true,

    admin: {
      description: "Text to show on a siggle events card e.g deadline",
    },
    defaultValue: defaultValue({
      en: "Deadline",
      fr: "Date limite",
      pt: "Prazo final",
    }),
  },
  {
    type: "select",
    label: {
      en: "Status to show on mobile",
      fr: "Statut à afficher sur mobile",
      pt: "Status para mostrar no celular",
    },
    hasMany: true,
    options: [
      {
        label: {
          en: "Technologies",
          fr: "Les technologies",
          pt: "Tecnologias",
        },
        value: "technologies",
      },
      {
        label: {
          en: "Other",
          fr: "Autre",
          pt: "Outro",
        },
        value: "other",
      },
    ],
    name: "showOnMobile",
    localized: true,

    defaultValue: defaultValue({
      en: ["technologied"],
      fr: ["technologied"],
      pt: ["technologied"],
    }),
    admin: {
      description: "Statuses to display on mobile",
    },
  },
  {
    type: "text",
    label: {
      en: "Status Group Title Suffix",
      fr: "Suffixe de titre de groupe de statut",
      pt: "Sufixo do título do grupo de status",
    },
    name: "statusGroupTitleSuffix",
    admin: {
      description: "Additional text on status title",
    },
    defaultValue: defaultValue({
      en: "",
      fr: "",
      pt: "",
    }),
    localized: true,
  },
];

const grants = [
  {
    type: "text",
    label: {
      en: "Title",
      fr: "Titre",
      pt: "Título",
    },
    name: "title",
    defaultValue: defaultValue({
      en: "Grants",
      fr: "Subventions",
      pt: "Subsídios",
    }),
    admin: {
      description: "Title to show on list of Grants. Defaults to Grants",
    },
    localized: true,
  },
  {
    type: "text",
    label: {
      en: "Show All Text",
      fr: "Afficher tout le texte",
      pt: "Mostre todo o texto",
    },
    name: "showAllText",
    defaultValue: defaultValue({
      en: "Show All",
      fr: "Afficher tout",
      pt: "Mostre tudo",
    }),
    admin: {
      description: "Used to toggle number of visible cards",
    },
    localized: true,
  },
  {
    type: "text",
    label: {
      en: "Show Less Text",
      fr: "Montrer moins de texte",
      pt: "Mostre menos texto",
    },
    name: "showLessText",
    defaultValue: defaultValue({
      en: "Show Less",
      fr: "Montrer moins",
      pt: "Mostre menos",
    }),
    admin: {
      description: "Used to toggle number of visible cards",
    },
    localized: true,
  },
  {
    type: "text",
    label: {
      en: "Date Text",
      fr: "Date SMS",
      pt: "Texto da data",
    },
    name: "dateText",
    localized: true,
    admin: {
      description: "Text to show on a siggle events card e.g deadline",
    },
    defaultValue: defaultValue({
      en: "Deadline",
      fr: "Date limite",
      pt: "Prazo final",
    }),
  },
  {
    type: "select",
    label: {
      en: "Status to show on mobile",
      fr: "Statut à afficher sur mobile",
      pt: "Status para mostrar no celular",
    },
    hasMany: true,
    options: [
      {
        label: {
          en: "Upcoming",
          fr: "A venir",
          pt: "Por vir",
        },
        value: "upcoming",
      },
      {
        label: {
          en: "Open",
          fr: "Ouvrir",
          pt: "Abrir",
        },
        value: "open",
      },
      {
        label: {
          en: "Past",
          fr: "Passé",
          pt: "Passado",
        },
        value: "past",
      },
    ],
    name: "showOnMobile",
    localized: true,

    defaultValue: defaultValue({
      en: ["upcoming"],
      fr: ["upcoming"],
      pt: ["upcoming"],
    }),
    admin: {
      description: "Statuses to display on mobile",
    },
  },
  {
    type: "text",
    label: {
      en: "Status Group Title Suffix",
      fr: "Suffixe de titre de groupe de statut",
      pt: "Sufixo do título do grupo de status",
    },
    name: "statusGroupTitleSuffix",
    admin: {
      description: "Additional text on status title",
    },
    defaultValue: defaultValue({
      en: "",
      fr: "",
      pt: "",
    }),
    localized: true,
  },
];

const groups = { events, grants, fellowships };

// resolves to default value if value doesn't exist in CMS
export const getConfigs = async (api, context) => {
  const savedConfigs = await api.findGlobal("translation-config", context);

  const processDefaults = (fieldGroup) =>
    fieldGroup.reduce(
      (accumulator, { name, defaultValue: value }) => ({
        ...accumulator,
        [name]: value(context),
      }),
      {}
    );

  return Object.keys(groups).reduce((accumulator, key) => {
    const defaultData = processDefaults(groups[key]);
    const fromCms = savedConfigs[key];
    return {
      ...accumulator,
      [key]: deepmerge(defaultData, fromCms),
    };
  }, {});
};

export const configFields = () => {
  const fields = Object.keys(groups).map((key) => ({
    type: "group",
    localized: true,
    fields: groups[key],
    name: key,
  }));
  return fields;
};
