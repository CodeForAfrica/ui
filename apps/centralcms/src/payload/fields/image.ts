import { deepmerge } from "@mui/utils";
import { Field } from "payload";

interface Args {
  overrides?: Partial<Field>;
}
function image({ overrides = undefined }: Args = {}) {
  const imageResult: Field = {
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
