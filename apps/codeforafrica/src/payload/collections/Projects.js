import image from "../fields/image";
import linkArray from "../fields/links/linkArray";
import linkGroup from "../fields/links/linkGroup";
import richText from "../fields/richText";
import slug from "../fields/slug";
import tags from "../fields/tags";
import nestCollectionUnderPage from "../utils/nestCollectionUnderPage";

const Projects = {
  slug: "projects",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      label: {
        en: "Name",
      },
      type: "text",
      required: true,
    },
    image({
      overrides: {
        label: {
          en: "Icon",
        },
        name: "icon",
        required: true,
      },
    }),
    {
      name: "title",
      label: { en: "Title" },
      type: "text",
      required: true,
    },
    richText({
      name: "subtitle",
    }),
    {
      name: "tagLine",
      label: {
        en: "Tagline",
      },
      type: "text",
    },
    tags({
      name: "tag",
      hasMany: false,
      admin: {
        position: "sidebar",
      },
    }),
    linkGroup({ overrides: { name: "externalLink", label: "Link" } }),
    image({
      overrides: {
        label: {
          en: "Thumbnail",
        },
        name: "thumbnail",
        required: true,
      },
    }),
    {
      name: "badges",
      type: "array",
      label: {
        en: "Badges",
      },
      fields: [
        {
          name: "name",
          label: {
            en: "Name",
          },
          type: "text",
          required: true,
        },
        {
          name: "date",
          type: "date",
          required: true,
          admin: {
            date: {
              pickerAppearance: "dayAndTime",
            },
          },
        },
      ],
    },
    richText({
      name: "description",
    }),
    linkArray(),
    {
      name: "partners",
      required: true,
      type: "relationship",
      relationTo: "partners",
      hasMany: true,
    },
    {
      name: "donors",
      required: true,
      label: {
        en: "Donors",
      },
      type: "relationship",
      relationTo: "donors",
      hasMany: true,
    },
    {
      name: "team",
      label: {
        en: "Team",
      },
      required: true,
      type: "relationship",
      relationTo: "members",
      hasMany: true,
    },
    slug({ fieldToUse: "name" }),
  ],
  hooks: {
    afterRead: [nestCollectionUnderPage("work")],
  },
};

export default Projects;
