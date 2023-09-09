import { deepmerge } from "@mui/utils";

function image({ overrides = undefined } = {}) {
  const imageResult = {
    name: "image",
    type: "upload",
    label: "Image",
    relationTo: "media",
    filterOptions: {
      mimeType: { contains: "image" },
    },
  };

  return deepmerge(imageResult, overrides);
}

export default image;
