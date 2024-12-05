function formInputFieldGroup({
  label,
  name,
  includeHintField = false,
  includeErrorMessageField = true,
  defaultLabelValue = "",
  defaultErrorMessage = "",
  defaultHint = "",
  additionalFields = [],
}) {
  const fields = [
    {
      name: `${name}Label`,
      label: "Label",
      type: "text",
      defaultValue: defaultLabelValue,
      required: true,
    },
  ];

  if (includeHintField) {
    fields.push({
      name: `${name}Hint`,
      label: "Hint",
      type: "text",
      defaultValue: defaultHint,
      required: true,
    });
  }

  if (includeErrorMessageField) {
    fields.push({
      name: `${name}ErrorMessage`,
      type: "text",
      label: "Error Message",
      defaultValue: defaultErrorMessage,
      required: true,
    });
  }

  fields.push(...additionalFields);

  return {
    type: "collapsible",
    label,
    fields: [
      {
        type: "row",
        fields,
      },
    ],
  };
}

export default formInputFieldGroup;
