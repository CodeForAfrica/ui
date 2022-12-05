/* eslint-disable import/prefer-default-export */
import link from "../fields/link";

const linkField = link();
linkField.fields.push({
  name: "children",
  type: "array",
  fields: [linkField],
});

export const Navigation = {
  slug: "navigation",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "navItems",
      type: "array",
      fields: [linkField],
    },
  ],
};
