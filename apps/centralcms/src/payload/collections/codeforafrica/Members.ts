import { allCountries } from "@/payload/lib/data/json/countries";
import image from "@/payload/fields/image";
import richText from "@/payload/fields/RichText";
import slug from "@/payload/fields/slug";
import socialLinks from "@/payload/fields/socialLinks";
import nestCollectionUnderPage from "@/payload/utilities/nestCollectionUnderPage";
import type { CollectionConfig, Option } from "payload";
import { canRead } from "@/payload/access/codeforafrica";

const Members: CollectionConfig = {
  access: {
    read: canRead,
    create: () => true,
    update: () => true,
  },
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
      options: allCountries as Option[],
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
