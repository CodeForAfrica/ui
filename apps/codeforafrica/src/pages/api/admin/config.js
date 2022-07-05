module.exports = {
  backend: {
    name: "git-gateway",
    branch: "main",
  },
  media_folder: "public/images",
  public_folder: "/images",
  local_backend: true,
  collections: [
    {
      name: "pages",
      label: "Pages",
      files: [
        {
          label: "Index",
          name: "index",
          widget: "object",
          file: "content/pages/index.md",
          fields: [
            {
              label: "Hero",
              name: "hero",
              widget: "object",
              collapsed: true,
              fields: [
                {
                  label: "Title",
                  name: "title",
                  widget: "markdown",
                },
                {
                  label: "Messages",
                  name: "messages",
                  widget: "list",
                },
                {
                  label: "Subtitle",
                  name: "subtitle",
                  widget: "text",
                },
                {
                  label: "Image",
                  name: "image",
                  widget: "image",
                },
              ],
            },
            {
              label: "Partners",
              name: "partners",
              widget: "relation",
              collection: "partners",
              search_fields: ["name"],
              value_field: "logo.src",
              display_fields: ["name"],
              multiple: true,
            },
          ],
        },
        {
          label: "About Us",
          name: "about",
          widget: "object",
          file: "content/pages/about.md",
          fields: [
            {
              label: "Title",
              name: "title",
              widget: "markdown",
            },
            {
              label: "Subtitle",
              name: "subtitle",
              widget: "markdown",
            },
            {
              label: "Background Image",
              name: "background_image",
              widget: "image",
            },
            {
              label: "Our Team",
              name: "team",
              widget: "relation",
              collection: "team",
              search_fields: ["name"],
              value_field: "id",
              display_fields: ["name"],
            },
          ],
        },
      ],
    },
    {
      name: "partners",
      label: "Data | Partners",
      folder: "content/partners",
      create: true,
      identifier_field: "name",
      label_singular: "Partner",
      fields: [
        {
          label: "Id",
          name: "id",
          widget: "uuid",
        },
        {
          label: "Name",
          name: "name",
          widget: "text",
        },
        {
          label: "Href",
          name: "href",
          widget: "text",
          required: false,
        },
        {
          label: "Logo",
          name: "logo",
          widget: "object",
          fields: [
            {
              label: "Source",
              name: "src",
              widget: "image",
            },
          ],
        },
      ],
    },
    {
      name: "projects",
      label: "Data | Projects",
      folder: "content/projects",
      create: true,
      label_singular: "Project",
      identifier_field: "name",
      fields: [
        {
          label: "Id",
          name: "id",
          widget: "uuid",
        },
        {
          label: "Name",
          name: "name",
          widget: "text",
        },
        {
          label: "Tag Line",
          name: "tagLine",
          widget: "text",
        },
        {
          label: "Title",
          name: "title",
          widget: "markdown",
        },
        {
          label: "Subtitle",
          name: "subtitle",
          widget: "markdown",
        },
        {
          label: "Description",
          name: "description",
          widget: "markdown",
        },
        {
          label: "Category",
          name: "category",
          widget: "text",
        },
        {
          label: "Icon",
          name: "icon",
          widget: "object",
          fields: [
            {
              label: "Source",
              name: "src",
              widget: "image",
            },
          ],
        },
        {
          label: "Thumbnail",
          name: "thumbnail",
          widget: "object",
          fields: [
            {
              label: "Source",
              name: "src",
              widget: "image",
            },
          ],
        },
        {
          label: "URL",
          name: "href",
          widget: "text",
        },
        {
          label: "External URL",
          name: "externalHref",
          widget: "text",
        },
        {
          label: "Badges",
          name: "badges",
          widget: "object",
          fields: [
            {
              label: "Badge",
              name: "badge",
              widget: "list",
              fields: [
                {
                  label: "Name",
                  name: "name",
                  widget: "text",
                },
                {
                  label: "Date",
                  name: "date",
                  widget: "datetime",
                  format: "MMMM Do YYYY",
                },
              ],
            },
          ],
        },
        {
          name: "partners",
          label: "Partners",
          widget: "relation",
          label_singular: "Partner",
          collection: "partners",
          search_fields: ["name"],
          value_field: "name",
          display_fields: ["name"],
          multiple: true,
        },
        {
          name: "donors",
          label: "Donors",
          widget: "relation",
          label_singular: "Donor",
          collection: "donors",
          search_fields: ["name"],
          value_field: "name",
          display_fields: ["name"],
          multiple: true,
        },
        {
          name: "links",
          label: "Links",
          widget: "object",
          fields: [
            {
              label: "Links",
              name: "links",
              label_singular: "Link",
              widget: "list",
              fields: [
                {
                  label: "Content",
                  name: "content",
                  widget: "text",
                },
                {
                  label: "Href",
                  name: "href",
                  widget: "text",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "donors",
      label: "Data | Donors",
      label_singular: "Donor",
      folder: "content/donors",
      create: true,
      identifier_field: "name",
      fields: [
        {
          label: "Id",
          name: "id",
          widget: "uuid",
        },
        {
          label: "Name",
          name: "name",
          widget: "text",
        },
        {
          label: "Logo",
          name: "logo",
          widget: "object",
          fields: [
            {
              label: "Source",
              name: "src",
              widget: "image",
              required: false,
            },
          ],
        },
      ],
    },
    {
      name: "team",
      label: "Data | Team",
      label_singular: "Team Member",
      folder: "content/team",
      create: true,
      identifier_field: "name",
      fields: [
        {
          label: "Id",
          name: "id",
          widget: "uuid",
        },
        {
          label: "Name",
          name: "name",
          widget: "text",
        },
        {
          label: "Title",
          name: "title",
          widget: "markdown",
        },
        {
          label: "Description",
          name: "description",
          widget: "markdown",
        },
        {
          label: "Image",
          name: "image",
          widget: "image",
        },
        {
          name: "links",
          label: "Links",
          widget: "object",
          label_singular: "Link",
          collapsed: true,
          fields: [
            {
              label: "Twitter",
              name: "twitter",
              widget: "text",
              required: false,
            },
            {
              label: "Github",
              name: "github",
              widget: "text",
              required: false,
            },
            {
              label: "LinkedIn",
              name: "linkedin",
              widget: "text",
              required: false,
            },
            {
              label: "Meta",
              name: "meta",
              widget: "text",
              required: false,
            },
          ],
        },
      ],
    },
  ],
};
