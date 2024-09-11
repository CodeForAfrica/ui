import { Block } from "payload";

const ContactForm: Block = {
  slug: "contact-form",
  imageURL: "/images/cms/blocks/codeforafrica/contact_form.jpg",
  imageAltText: "Contact Form",
  fields: [
    {
      name: "embedCode",
      type: "code",
      required: true,
      admin: {
        language: "html",
      },
    },
  ],
};

export default ContactForm;
