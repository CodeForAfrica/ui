function formInputFieldGroup({
  label,
  name,
  includeErrorMessageField = true,
  includeHintField = false,
  additionalFields = [],
}) {
  const fields = [
    {
      name: `${name}Label`,
      label: "Label",
      type: "text",
      required: true,
    },
  ];

  if (includeHintField) {
    fields.push({
      name: `${name}Hint`,
      label: "Hint",
      type: "text",
      required: true,
    });
  }

  if (includeErrorMessageField) {
    fields.push({
      name: `${name}ErrorMessage`,
      type: "text",
      label: "Error Message",
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
