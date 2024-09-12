import { deepmerge } from "@mui/utils";
import { Field } from "payload";

const authors = (overrides): Field =>
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
