import { select } from "payload/dist/fields/validations";

function validateUniqueArrayFieldSelect(
  arrayField,
  selectField,
  selectOptions,
  validationResourceMessage,
  overrides = {},
) {
  const { name: arrayFieldName = arrayField } = overrides;

  return function validate(val, args) {
    const { data, name: selectFieldName = selectField, t } = args || {};
    if (
      data?.[arrayFieldName]?.filter((l) => l?.[selectFieldName] === val)
        ?.length > 1
    ) {
      return t(validationResourceMessage);
    }

    const { hasMany, options = selectOptions, required = true } = args;
    return select(val, { hasMany, options, required, t });
  };
}

export default validateUniqueArrayFieldSelect;
