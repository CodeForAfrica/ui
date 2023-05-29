const AgaInfographic = {
  slug: "aga-infographic",
  labels: {
    singular: {
      en: "AGA Infographic",
      fr: "AGA Infographie",
      pt: "AGA Infográfico",
    },
    plural: {
      en: "AGA Infographic",
      fr: "AGA Infographie",
      pt: "AGA Infográfico",
    },
  },
  fields: [
    {
      name: "infographicId",
      label: {
        en: "ID",
      },
      type: "text",
      defaultValue: "charter-project-infographic",
      required: true,
      admin: {
        description: "This must match what is expected in the script",
      },
    },
    {
      name: "dataFile",
      label: {
        en: "Data file",
        fr: "Le fichier de données",
        pt: "Arquivo de dados",
      },
      type: "upload",
      relationTo: "media",
      filterOptions: {
        mimeType: { contains: "json" },
      },
      localized: true,
      admin: {
        description:
          "If not provided, will use default file at /infographic/data/data.json",
      },
    },
    {
      name: "countriesFile",
      label: {
        en: "Countries file",
        fr: "Le fichier de pays",
        pt: "Arquivo dos países",
      },
      type: "upload",
      relationTo: "media",
      filterOptions: {
        mimeType: { contains: "json" },
      },
      localized: true,
      admin: {
        description:
          "If not provided, will use default file at /infographic/data/countries.json",
      },
    },
  ],
};

export default AgaInfographic;
