import image from "../fields/image";
import link from "../fields/links/link";
import linkArray from "../fields/links/linkArray";
import linkGroup from "../fields/links/linkGroup";
import richText from "../fields/richText";
import slug from "../fields/slug";
import tags from "../fields/tags";
import nestCollectionUnderPage from "../utils/nestCollectionUnderPage";

const Projects = {
  slug: "projects",
  admin: {
    defaultColumns: ["name", "tagLine", "updatedAt"],
    enableRichTextLink: false,
    group: "Organisation",
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      localized: true,
    },
    image({
      overrides: {
        name: "icon",
        required: true,
        localized: true,
      },
    }),
    richText({
      name: "title",
      required: true,
      localized: true,
    }),
    richText({
      name: "subtitle",
      required: true,
      localized: true,
    }),
    {
      name: "tagLine",
      type: "text",
      required: true,
      localized: true,
    },
    tags({
      name: "tag",
      hasMany: false,
      admin: {
        position: "sidebar",
      },
    }),
    linkGroup({
      overrides: { name: "externalLink", label: "Link", localized: true },
    }),
    image({
      overrides: {
        name: "thumbnail",
        required: true,
        localized: true,
      },
    }),
    {
      name: "badges",
      type: "array",
      localized: true,
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "date",
          type: "date",
          required: true,
          admin: {
            date: {
              pickerAppearance: "dayOnly",
              displayFormat: "yyyy-MM-dd",
            },
          },
        },
      ],
    },
    richText({
      name: "description",
      required: true,
      localized: true,
    }),
    linkArray({
      overrides: {
        fields: [
          {
            name: "type",
            type: "select",
            options: [
              {
                value: "source",
                label: { en: "Source code" },
              },
              {
                value: "data",
                label: { en: "Data" },
              },
            ],
            required: true,
          },
          link({
            defaultValue: "custom",
            disableLinkTypeSelection: true,
            disableOpenInNewTab: true,
          }),
        ],
        localized: true,
      },
    }),
    {
      name: "partners",
      type: "relationship",
      relationTo: "partners",
      hasMany: true,
      required: true,
      localized: true,
    },
    {
      name: "donors",
      type: "relationship",
      relationTo: "donors",
      hasMany: true,
      required: true,
      localized: true,
    },
    {
      name: "team",
      type: "relationship",
      relationTo: "members",
      hasMany: true,
      required: true,
      localized: true,
    },
    slug({ fieldToUse: "name" }),
  ],
  hooks: {
    afterRead: [nestCollectionUnderPage("projects")],
  },
};

export default Projects;
