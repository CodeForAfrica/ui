import { allCountries } from "../../lib/data/countries";
import image from "../fields/image";
import slug from "../fields/slug";

const Members = {
  slug: "members",
  admin: {
    defaultColumns: ["name", "title", "country", "updatedAt"],
    enableRichTextLink: false,
    group: "Project",
    useAsTitle: "name",
  },
  fields: [
    image({
      overrides: {
        required: true,
      },
    }),
    {
      name: "name",
      type: "text",
      required: true,
      localized: true,
      index: true,
    },
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    slug({ fieldToUse: "name" }),
    {
      name: "country",
      type: "select",
      options: allCountries,
    },
    {
      name: "active",
      type: "checkbox",
      label: "Is Active?",
      required: true,
      defaultValue: true,
    },
  ],
};

export default Members;
