const settings = ({
  slug,
  label,
  group,
  tabs,
  access = {
    read: () => true,
  },
  settingsOptions = {},
}) => {
  return {
    slug,
    label,
    access,
    admin: {
      group,
    },
    fields: [
      {
        type: "tabs",
        tabs,
      },
    ],
    ...settingsOptions,
  };
};

export default settings;
