const settings = ({
  slug,
  label,
  group,
  tabs,
  access = {
    read: () => true,
  },
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
  };
};

export default settings;
