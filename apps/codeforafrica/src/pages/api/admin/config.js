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
          file: "content/pages/index.md",
          fields: [
            {
              label: "Hero",
              name: "hero",
              widget: "object",
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
                  min: 3,
                  max: 3,
                },
                {
                  label: "Subtitle",
                  name: "subtitle",
                  widget: "text",
                },
                {
                  label: "Image",
                  name: "image",
                  widget: "object",
                  fields: [
                    {
                      label: "Src",
                      name: "src",
                      widget: "image",
                    },
                    {
                      label: "Height",
                      name: "height",
                      widget: "string",
                      required: false,
                    },
                    {
                      label: "Width",
                      name: "width",
                      widget: "string",
                      required: false,
                    },
                  ],
                },
              ],
            },
            {
              label: "Projects",
              name: "projects",
              widget: "relation",
              collection: "projects",
              search_fields: ["name"],
              value_field: "id",
              display_fields: ["name"],
              multiple: true,
            },
            {
              label: "Meet Our Team",
              name: "meet-our-team",
              widget: "object",
              fields: [
                {
                  label: "Title",
                  name: "title",
                  widget: "string",
                },
                {
                  label: "Description",
                  name: "description",
                  widget: "markdown",
                },
                {
                  label: "Href",
                  name: "href",
                  widget: "string",
                },
                {
                  label: "Image",
                  name: "image",
                  widget: "object",
                  fields: [
                    {
                      label: "Src",
                      name: "src",
                      widget: "image",
                    },
                    {
                      label: "Height",
                      name: "height",
                      widget: "string",
                      required: false,
                    },
                    {
                      label: "Width",
                      name: "width",
                      widget: "string",
                      required: false,
                    },
                  ],
                },
              ],
            },
            {
              label: "Our partners",
              name: "our-partners",
              widget: "object",
              fields: [
                {
                  label: "Title",
                  name: "title",
                  widget: "markdown",
                },
                {
                  label: "Partners",
                  name: "partners-list",
                  widget: "relation",
                  collection: "partners",
                  search_fields: ["name"],
                  value_field: "id",
                  display_fields: ["name"],
                  multiple: true,
                },
              ],
            },
            {
              label: "Our Impact",
              name: "our-impact",
              widget: "object",
              fields: [
                {
                  label: "Impact",
                  name: "impact-list",
                  widget: "relation",
                  collection: "impact",
                  search_fields: ["title"],
                  value_field: "id",
                  display_fields: ["title"],
                  multiple: true,
                },
                {
                  label: "Action",
                  name: "action",
                  widget: "object",
                  fields: [
                    {
                      name: "title",
                      widget: "string",
                    },
                    {
                      name: "href",
                      widget: "string",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "About Us",
          name: "about",
          file: "content/pages/about.md",
          fields: [
            {
              label: "Title",
              name: "title",
              widget: "string",
            },
            {
              label: "Subtitle",
              name: "subtitle",
              widget: "markdown",
            },
            {
              label: "Background Image",
              name: "background-image",
              widget: "object",
              fields: [
                {
                  label: "Src",
                  name: "src",
                  widget: "image",
                },
                {
                  label: "Height",
                  name: "height",
                  widget: "string",
                  required: false,
                },
                {
                  label: "Width",
                  name: "width",
                  widget: "string",
                  required: false,
                },
              ],
            },
            {
              label: "Our Team",
              name: "team",
              widget: "relation",
              collection: "team",
              search_fields: ["name"],
              value_field: "id",
              display_fields: ["name"],
              multiple: true,
            },
            {
              label: "Our partners",
              name: "our-partners",
              widget: "object",
              fields: [
                {
                  label: "Title",
                  name: "title",
                  widget: "markdown",
                },
                {
                  label: "Partners",
                  name: "partners-list",
                  widget: "relation",
                  collection: "partners",
                  search_fields: ["name"],
                  value_field: "id",
                  display_fields: ["name"],
                  multiple: true,
                },
              ],
            },
            {
              label: "Our Mission",
              name: "mission",
              widget: "object",
              file: "content/pages/mission.md",
              fields: [
                {
                  label: "Title",
                  name: "title",
                  widget: "text",
                },
                {
                  label: "Description",
                  name: "description",
                  widget: "markdown",
                },
              ],
            },
            {
              label: "Guiding Principles",
              name: "guiding-principles",
              label_singular: "Guiding Principle",
              widget: "relation",
              collection: "guiding-principles",
              search_fields: ["title"],
              value_field: "id",
              display_fields: ["title"],
              multiple: true,
            },
            {
              label: "Our Impact",
              name: "our-impact",
              widget: "object",
              fields: [
                {
                  label: "Title",
                  name: "title",
                  widget: "string",
                },
                {
                  label: "Impact",
                  name: "impact-list",
                  widget: "relation",
                  collection: "impact",
                  search_fields: ["title"],
                  value_field: "id",
                  display_fields: ["title"],
                  multiple: true,
                },
              ],
            },
          ],
        },
        {
          label: "Contact Us",
          name: "contact",
          file: "content/pages/contact.md",
          fields: [
            {
              label: "Title",
              name: "title",
              widget: "string",
            },
            {
              label: "Subtitle",
              name: "subtitle",
              widget: "string",
            },
            {
              label: "Join Us",
              name: "join-us",
              widget: "object",
              fields: [
                {
                  label: "Title",
                  name: "title",
                  widget: "string",
                },
                {
                  label: "Subtitle",
                  name: "subtitle",
                  widget: "string",
                },
                {
                  label: "Action",
                  name: "action",
                  widget: "string",
                },
                {
                  label: "Icon",
                  name: "icon",
                  widget: "object",
                  fields: [
                    {
                      label: "Src",
                      name: "src",
                      widget: "image",
                    },
                    {
                      label: "Href",
                      name: "href",
                      widget: "string",
                    },
                    {
                      label: "Height",
                      name: "height",
                      widget: "string",
                      required: false,
                    },
                    {
                      label: "Width",
                      name: "width",
                      widget: "string",
                      required: false,
                    },
                  ],
                },
                {
                  label: "Our Offices",
                  name: "offices-addresses",
                  widget: "relation",
                  collection: "offices-addresses",
                  search_fields: ["name"],
                  value_field: "id",
                  display_fields: ["name"],
                  multiple: true,
                },
              ],
            },
          ],
        },
        {
          label: "Imprint",
          name: "imprint",
          file: "content/pages/imprint.md",
          fields: [
            {
              label: "Title",
              name: "title",
              widget: "string",
            },
            {
              label: "Subtitle",
              name: "subtitle",
              widget: "string",
            },
            {
              label: "Body",
              name: "body",
              widget: "markdown",
            },
          ],
        },
        {
          label: "Privacy Policy",
          name: "privacy-policy",
          file: "content/pages/privacy-policy.md",
          fields: [
            {
              label: "Title",
              name: "title",
              widget: "string",
            },
            {
              label: "Subtitle",
              name: "subtitle",
              widget: "string",
            },
            {
              label: "Body",
              name: "body",
              widget: "markdown",
            },
          ],
        },
      ],
    },
    {
      label: "Data | Badges",
      name: "badges",
      label_singular: "Badge",
      folder: "content/badges",
      create: true,
      fields: [
        {
          label: "Id",
          name: "id",
          widget: "uuid",
        },
        {
          label: "Name",
          name: "name",
          widget: "string",
        },
        {
          label: "Description",
          name: "body",
          widget: "markdown",
        },
        {
          label: "Date",
          name: "date",
          widget: "datetime",
          format: "MMMM Do YYYY",
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
          widget: "string",
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
      label: "Data | Guiding Principles",
      name: "guiding-principles",
      label_singular: "Guiding Principle",
      folder: "content/guiding-principles",
      create: true,
      identifier_field: "title",
      fields: [
        {
          label: "Id",
          name: "id",
          widget: "uuid",
        },
        {
          label: "Title",
          name: "title",
          widget: "string",
        },
        {
          label: "Description",
          name: "body",
          widget: "markdown",
        },
        {
          label: "Image",
          name: "image",
          widget: "object",
          fields: [
            {
              label: "Source",
              name: "src",
              widget: "image",
            },
            {
              label: "Height",
              name: "height",
              widget: "string",
              required: false,
            },
            {
              label: "Width",
              name: "width",
              widget: "string",
              required: false,
            },
          ],
        },
      ],
    },
    {
      label: "Data | Impact",
      name: "impact",
      label_singular: "Impact",
      folder: "content/impact",
      create: true,
      identifier_field: "title",
      fields: [
        {
          label: "Id",
          name: "id",
          widget: "uuid",
        },
        {
          label: "Title",
          name: "title",
          widget: "string",
        },
        {
          label: "Description",
          name: "body",
          widget: "markdown",
        },
        {
          label: "Count",
          name: "value",
          widget: "string",
        },
        {
          label: "Image",
          name: "image",
          widget: "object",
          fields: [
            {
              label: "Source",
              name: "src",
              widget: "image",
            },
            {
              label: "Height",
              name: "height",
              widget: "string",
              required: false,
            },
            {
              label: "Width",
              name: "width",
              widget: "string",
              required: false,
            },
          ],
        },
      ],
    },
    {
      label: "Data | Offices",
      name: "offices-addresses",
      label_singular: "Office",
      folder: "content/offices",
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
          widget: "string",
        },
        {
          label: "Address",
          name: "body",
          widget: "markdown",
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
          widget: "string",
        },
        {
          label: "Description",
          name: "body",
          widget: "markdown",
        },
        {
          label: "Href",
          name: "href",
          widget: "string",
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
      label: "Data | Projects",
      name: "projects",
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
          widget: "string",
        },
        {
          label: "Tag Line",
          name: "tagLine",
          widget: "string",
        },
        {
          label: "Title",
          name: "title",
          widget: "string",
        },
        {
          label: "Subtitle",
          name: "subtitle",
          widget: "markdown",
        },
        {
          label: "Description",
          name: "body",
          widget: "markdown",
        },
        {
          label: "Tag",
          name: "tag",
          widget: "string",
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
          label: "External URL",
          name: "externalHref",
          widget: "string",
        },
        {
          label: "Badges",
          name: "badges",
          widget: "relation",
          label_singular: "Badge",
          collection: "badges",
          search_fields: ["name"],
          value_field: "id",
          display_fields: ["name"],
          multiple: true,
        },
        {
          name: "partners",
          label: "Partners",
          widget: "relation",
          label_singular: "Partner",
          collection: "partners",
          search_fields: ["name"],
          value_field: "id",
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
          value_field: "id",
          display_fields: ["name"],
          multiple: true,
        },
        {
          name: "team",
          label: "Team",
          widget: "relation",
          label_singular: "Team Member",
          collection: "team",
          search_fields: ["name"],
          value_field: "id",
          display_fields: ["name"],
          multiple: true,
        },
        {
          name: "links",
          label: "Links",
          label_singular: "Link",
          widget: "list",
          summary: "{{content}} - {{href}}",
          fields: [
            {
              label: "slug",
              name: "slug",
              widget: "string",
            },
            {
              label: "Content",
              name: "content",
              widget: "string",
            },
            {
              label: "Href",
              name: "href",
              widget: "string",
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
                {
                  label: "Height",
                  name: "height",
                  widget: "string",
                  required: false,
                },
                {
                  label: "Width",
                  name: "width",
                  widget: "string",
                  required: false,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      label: "Data | Team",
      name: "team",
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
          widget: "string",
        },
        {
          label: "Title",
          name: "title",
          widget: "string",
        },
        {
          label: "Description",
          name: "body",
          widget: "markdown",
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
            {
              label: "Height",
              name: "height",
              widget: "string",
              required: false,
            },
            {
              label: "Width",
              name: "width",
              widget: "string",
              required: false,
            },
          ],
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
              widget: "string",
              required: false,
            },
            {
              label: "Github",
              name: "github",
              widget: "string",
              required: false,
            },
            {
              label: "LinkedIn",
              name: "linkedin",
              widget: "string",
              required: false,
            },
            {
              label: "Meta",
              name: "meta",
              widget: "string",
              required: false,
            },
          ],
        },
        {
          label: "Country",
          name: "country",
          widget: "string",
        },
        {
          label: "Team",
          name: "team",
          widget: "string",
        },
      ],
    },
  ],
};
