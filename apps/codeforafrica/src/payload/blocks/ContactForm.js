const ContactForm = {
  slug: "contact-form",
  imageURL: "/images/cms/blocks/contact_form.jpg",
  imageAltText: "Contact From Code",
  fields: [
    {
      name: "embedCode",
      type: "code",
      label: "Embed Code",
      required: true,
      admin: {
        language: "html",
      },
    },
  ],
};

export default ContactForm;
