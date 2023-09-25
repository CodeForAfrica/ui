import { deepmerge } from "@mui/utils";

const dateTime = (overrides) =>
  deepmerge(
    {
      name: "date",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    overrides,
  );

export default dateTime;
