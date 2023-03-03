const PageConfig = {
  slug: "page-config",
  label: {
    en: "Page Configurations",
    fr: "Configuration de la page",
    pt: "Config da página",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      label: {
        en: "Events",
        fr: "Événements",
        pt: "Eventos",
      },
      type: "group",
      localized: true,
      name: "events",
      fields: [
        {
          type: "text",
          label: {
            en: "Show All Text",
            fr: "Afficher tout le texte",
            pt: "Mostre todo o texto",
          },
          name: "showAllText",
          localized: true,
          required: true,
        },
        {
          type: "text",
          label: {
            en: "Show Less Text",
            fr: "Montrer moins de texte",
            pt: "Mostre menos texto",
          },
          name: "showLessText",
          localized: true,
          required: true,
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
          required: true,
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
          required: true,
        },
        {
          type: "text",
          label: {
            en: "Status Group Title Suffix",
            fr: "Suffixe de titre de groupe de statut",
            pt: "Sufixo do título do grupo de status",
          },
          name: "statusGroupTitleSuffix",
          localized: true,
        },
      ],
    },
    {
      label: {
        en: "Grants",
        fr: "Subventions",
        pt: "Subsídios",
      },
      type: "group",
      localized: true,
      name: "grants",
      fields: [
        {
          type: "text",
          label: {
            en: "Show All Text",
            fr: "Afficher tout le texte",
            pt: "Mostre todo o texto",
          },
          name: "showAllText",
          localized: true,
          required: true,
        },
        {
          type: "text",
          label: {
            en: "Show Less Text",
            fr: "Montrer moins de texte",
            pt: "Mostre menos texto",
          },
          name: "showLessText",
          localized: true,
          required: true,
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
          required: true,
        },
        {
          type: "select",
          hasMany: true,
          label: {
            en: "Status to show on mobile",
            fr: "Statut à afficher sur mobile",
            pt: "Status para mostrar no celular",
          },
          options: [
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
                en: "Closed",
                fr: "Fermé",
                pt: "Fechado",
              },
              value: "closed",
            },
          ],
          name: "showOnMobile",
          localized: true,
          required: true,
        },
        {
          type: "text",
          label: {
            en: "Status Group Title Suffix",
            fr: "Suffixe de titre de groupe de statut",
            pt: "Sufixo do título do grupo de status",
          },
          name: "statusGroupTitleSuffix",
          localized: true,
        },
      ],
    },
    {
      label: {
        en: "Fellowships",
        fr: "Bourses",
        pt: "Bolsas",
      },
      type: "group",
      localized: true,
      name: "fellowships",
      fields: [
        {
          type: "text",
          label: {
            en: "Show All Text",
            fr: "Afficher tout le texte",
            pt: "Mostre todo o texto",
          },
          name: "showAllText",
          localized: true,
          required: true,
        },
        {
          type: "text",
          label: {
            en: "Show Less Text",
            fr: "Montrer moins de texte",
            pt: "Mostre menos texto",
          },
          name: "showLessText",
          localized: true,
          required: true,
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
          required: true,
        },
        {
          type: "select",
          hasMany: true,
          label: {
            en: "Status to show on mobile",
            fr: "Statut à afficher sur mobile",
            pt: "Status para mostrar no celular",
          },
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
          required: true,
        },
        {
          type: "text",
          label: {
            en: "Status Group Title Suffix",
            fr: "Suffixe de titre de groupe de statut",
            pt: "Sufixo do título do grupo de status",
          },
          name: "statusGroupTitleSuffix",
          localized: true,
        },
      ],
    },
  ],
};

export default PageConfig;
