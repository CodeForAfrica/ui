import { deepmerge } from "@mui/utils";

const authors = (overrides) =>
  deepmerge(
    {
      name: "authors",
      type: "relationship",
      relationTo: "author",
      hasMany: true,
      admin: {
        isSortable: true,
        position: "sidebar",
      },
    },
    overrides,
  );

export default authors;
