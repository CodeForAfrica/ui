import { deepmerge } from "@mui/utils";
import { Field } from "payload";

const publishedOn = (overrides): Field =>
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
