import { deepmerge } from "@mui/utils";

const publishedOn = (overrides) =>
  deepmerge(
    {
      name: "publishedOn",
      type: "date",
      required: true,
      hooks: {
        beforeValidate: [({ value }) => (value ? new Date(value) : new Date())],
      },
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
        position: "sidebar",
      },
    },
    overrides,
  );

export default publishedOn;
