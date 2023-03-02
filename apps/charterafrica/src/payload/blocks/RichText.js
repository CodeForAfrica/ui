import blockFields from "../fields/blockFields";
import richText from "../fields/richText";

const RichText = {
  slug: "richText",
  fields: [
    blockFields({
      name: "richTextBlockFields",
      fields: [
        richText({
          name: "content",
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
          },
        }),
      ],
    }),
  ],
};

export default RichText;
