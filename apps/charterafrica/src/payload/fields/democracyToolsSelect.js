import { Select } from "payload/components/forms";
import { select } from "payload/dist/fields/validations";
import { createElement } from "react";

export const validateSelect = async (value, { hasMany, required, t }) => {
  try {
    return select(value, { hasMany, options: [], required, t });
  } catch (error) {
    return select(value, { hasMany, options: [], required, t });
  }
};

export function SheetSelect(props) {
  return createElement(Select, { ...props, options: [] });
}

export function ColumnSelect(props) {
  return createElement(Select, { ...props, options: [] });
}
