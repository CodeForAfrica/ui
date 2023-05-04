import { deepmerge } from "@mui/utils";

const updatedAt = (overrides) =>
  deepmerge(
    {
      name: "updatedAt",
      type: "date",
      hooks: {
        beforeValidate: [({ value }) => (value ? new Date(value) : new Date())],
      },
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

export default updatedAt;
