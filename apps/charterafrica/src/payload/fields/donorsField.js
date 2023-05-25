import { deepmerge } from "@mui/utils";

const field = {
  name: "donors",
  type: "array",
  admin: {
    readOnly: true,
    initCollapsed: true,
  },
  label: { en: "Donors", fr: "Donateurs", pt: "Doadores" },
  fields: [
    {
      name: "name",
      type: "text",
      label: { en: "Name", fr: "Nom", pt: "Nome" },
      required: true,
    },
  ],
};

export default (overrides) => deepmerge(field, overrides);
