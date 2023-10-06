import { deepmerge } from "@mui/utils";

function image({ overrides = undefined } = {}) {
  const imageResult = {
    name: "image",
    type: "upload",
    relationTo: "media",
    filterOptions: {
      mimeType: { contains: "image" },
    },
  };

  return deepmerge(imageResult, overrides);
}

export default image;
