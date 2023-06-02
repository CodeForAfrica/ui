import { deepmerge } from "@mui/utils";

const dateField = (overrides) =>
  deepmerge(
    {
      name: "updatedAt",
      type: "date",
      admin: {
        readOnly: true,
        date: {
          pickerAppearance: "dayAndTime",
        },
        position: "sidebar",
      },
    },
    overrides
  );

export default dateField;
