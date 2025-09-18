const FormSubmissions = {
  slug: "form-submissions",
  admin: { useAsTitle: "id" },
  fields: [
    {
      name: "form",
      type: "relationship",
      relationTo: "forms",
      required: true,
    },
    {
      name: "data",
      type: "json",
    },
  ],
};

export default FormSubmissions;
