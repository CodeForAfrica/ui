import { deepmerge } from "@mui/utils";
import { Field } from "payload";

interface BlockFieldsProps {
  name: string;
  fields: Field[];
  overrides?: Record<string, any>;
}

const blockFields = ({ name, fields, overrides }: BlockFieldsProps) =>
  deepmerge(
    {
      name,
      label: false,
      type: "group",
      admin: {
        hideGutter: true,
        style: {
          margin: 0,
          padding: 0,
        },
      },
      fields,
    },
    overrides,
  ) as Field;

export default blockFields;
