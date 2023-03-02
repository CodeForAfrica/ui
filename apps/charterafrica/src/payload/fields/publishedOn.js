import { deepmerge } from "@mui/utils";

const publishedOn = (overrides) =>
  deepmerge(
    {
      name: "publishedOn",
      type: "date",
      required: true,
      hooks: {
        beforeValidate: [({ value }) => new Date(value)],
      },
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
        position: "sidebar",
      },
    },
    overrides
  );

export default publishedOn;
