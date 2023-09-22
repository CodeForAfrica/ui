import { deepmerge } from "@mui/utils";

const articles = (overrides) =>
  deepmerge(
    {
      name: "articles",
      type: "relationship",
      relationTo: "article",
      hasMany: true,
    },
    overrides,
  );

export default articles;
