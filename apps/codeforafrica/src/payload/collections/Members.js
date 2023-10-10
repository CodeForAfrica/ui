import { allCountries } from "../../lib/data/json/countries";
import image from "../fields/image";
import richText from "../fields/richText";
import slug from "../fields/slug";
import socialLinks from "../fields/socialLinks";
import nestCollectionUnderPage from "../utils/nestCollectionUnderPage";

const Members = {
  slug: "members",
  labels: {
    singular: {
      en: "Member",
    },
    plural: {
      en: "Members",
    },
  },
  admin: {
    defaultColumns: ["name", "title", "team.name", "updatedAt"],
    enableRichTextLink: false,
    group: "Organisation",
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
    richText({
      name: "description",
      required: true,
      localized: true,
    }),
    socialLinks({
      name: "connect",
      label: "Social Media Links",
      required: false,
      localized: true,
    }),
    {
      name: "team",
      type: "relationship",
      relationTo: "teams",
      required: true,
    },
  ],
  hooks: {
    afterRead: [nestCollectionUnderPage("members")],
  },
};

export default Members;
