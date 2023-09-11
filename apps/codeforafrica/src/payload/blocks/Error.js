import richText from "../fields/richText";

const Error = {
  slug: "error",
  imageURL: "/images/cms/blocks/error.png",
  imageAltText: "Used in Error page.",
  fields: [
    {
      name: "title",
      label: {
        en: "Title",
        fr: "Titre",
        pt: "Título",
      },
      type: "text",
      localized: true,
      required: true,
    },
    richText({
      name: "description",
      label: {
        en: "Description",
        fr: "La description",
        pt: "Descrição",
      },
      localized: true,
      required: true,
      admin: {
        elements: ["link"],
      },
    }),
  ],
};

export default Error;
