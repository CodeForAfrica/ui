const settings = ({ slug, label, group, tabs }) => {
  return {
    slug,
    label,
    access: {
      read: () => true,
    },
    admin: {
      group,
    },
    fields: [
      {
        type: "tabs",
        tabs,
      },
    ],
  };
};

export default settings;
