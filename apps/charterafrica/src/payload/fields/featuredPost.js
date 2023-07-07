import { deepmerge } from "@mui/utils";

function featuredPost(overrides) {
  const field = {
    name: "featuredPost",
    label: {
      en: "Featured Post",
      pt: "Postagem em destaque",
      fr: "Après sélectionnée",
    },
    type: "relationship",
    relationTo: ["events", "news", "research"],
  };

  return deepmerge(field, overrides);
}

export default featuredPost;
