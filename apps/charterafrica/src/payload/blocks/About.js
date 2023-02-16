import richText from "../fields/richText";

const About = {
  slug: "about",
  labels: {
    singular: {
      en: "About",
    },
    plural: {
      en: "About",
    },
  },
  fields: [
    richText({
      name: "description",
      label: {
        en: "Description",
        fr: "La description",
        pt: "Descrição",
      },
      required: true,
      localized: true,
      admin: {
        elements: [
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "link",
          "ol",
          "ul",
          "indent",
        ],
        leaves: ["bold", "code", "italic", "underline"],
      },
    }),
  ],
};

export default About;
