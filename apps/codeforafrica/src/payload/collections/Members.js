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
    useAsTitle: "name",
    defaultColumns: ["name", "title", "country"],
  },
  fields: [
    image({
      overrides: {
        required: true,
      },
    }),
    {
      name: "name",
      label: {
        en: "Name",
      },
      type: "text",
      required: true,
    },
    {
      name: "title",
      label: {
        en: "Title",
      },
      type: "text",
      required: true,
    },
    slug({ fieldToUse: "name" }),
    {
      name: "country",
      label: { en: "country" },
      type: "select",
      options: allCountries,
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
    }),
    socialLinks({
      name: "connect",
      label: "Social Media Links",
      required: false,
    }),
    {
      name: "team",
      label: {
        en: "Team",
      },
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
