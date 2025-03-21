import linkGroup from "../fields/links/linkGroup";
import richText from "../fields/richText";

const Error = {
  slug: "error",
  fields: [
    {
      name: "statusCode",
      label: "Status Code",
      type: "number",
      required: true,
    },
    {
      name: "title",
      label: "Title",
      type: "text",
      localized: true,
      required: true,
    },
    richText({
      name: "description",
      label: "Description",
      localized: true,
      required: true,
    }),
    linkGroup(),
  ],
};

export default Error;
