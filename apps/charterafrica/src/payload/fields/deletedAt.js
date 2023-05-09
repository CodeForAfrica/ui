import { deepmerge } from "@mui/utils";

const deletedAt = (overrides) =>
  deepmerge(
    {
      name: "deletedAt",
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

export default deletedAt;
