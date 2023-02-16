const Global = {
  slug: "global",
  fields: [
    {
      name: "block",
      label: {
        en: "Block",
        fr: "Bloc",
        pt: "Bloco",
      },
      type: "select",
      options: [
        {
          value: "helpdesk",
          label: "Democracy Helpdesk",
        },
        {
          value: "focal-countries",
          label: "Focal Countries",
        },
      ],
      required: true,
      admin: {
        isClearable: true,
      },
    },
  ],
};

export default Global;
