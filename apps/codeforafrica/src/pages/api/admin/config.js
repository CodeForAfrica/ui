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
              label: "Partners",
              name: "partners",
              widget: "relation",
              collection: "partners",
              search_fields: ["name"],
              value_field: "id",
              display_fields: ["name"],
              multiple: true,
            },
            {
              label: "Our Impact",
              name: "impact",
              widget: "relation",
              collection: "impact",
              search_fields: ["title"],
              value_field: "id",
              display_fields: ["title"],
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
              widget: "string",
            },
            {
              label: "Subtitle",
              name: "subtitle",
              widget: "markdown",
            },
            {
              label: "Background Image",
              name: "background_image",
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
              label: "Our Partners",
              name: "partners",
              widget: "relation",
              collection: "partners",
              search_fields: ["name"],
              value_field: "id",
              display_fields: ["name"],
              multiple: true,
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
              name: "guiding_principles",
              label_singular: "Guiding Principle",
              widget: "relation",
              collection: "guiding_principles",
              search_fields: ["title"],
              value_field: "id",
              display_fields: ["title"],
              multiple: true,
            },
            {
              label: "Our Impact",
              name: "impact",
              label_singular: "Impact",
              widget: "relation",
              collection: "impact",
              search_fields: ["title"],
              value_field: "id",
              display_fields: ["title"],
              multiple: true,
            },
          ],
        },
        {
          label: "Contact Us",
          name: "contact",
          widget: "object",
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
              name: "join_us",
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
                  name: "offices_addresses",
                  widget: "relation",
                  collection: "offices_addresses",
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
          label: "Footer",
          name: "footer",
          widget: "object",
          file: "content/pages/footer.md",
          fields: [
            {
              label: "Description",
              name: "description",
              widget: "text",
            },
            {
              label: "Logo",
              name: "logo",
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
              label: "Social Media",
              name: "social_media",
              widget: "object",
              fields: [
                {
                  label: "Description",
                  name: "description",
                  widget: "string",
                },
                {
                  label: "Twitter",
                  name: "twitter",
                  widget: "object",
                  fields: [
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
                      label: "Href",
                      name: "href",
                      widget: "string",
                    },
                  ],
                },
                {
                  label: "Facebook",
                  name: "facebook",
                  widget: "object",
                  fields: [
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
                      label: "Href",
                      name: "href",
                      widget: "string",
                    },
                  ],
                },
                {
                  label: "Instagram",
                  name: "instagram",
                  widget: "object",
                  fields: [
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
                      label: "Href",
                      name: "href",
                      widget: "string",
                    },
                  ],
                },
                {
                  label: "Github",
                  name: "github",
                  widget: "object",
                  fields: [
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
                      label: "Href",
                      name: "href",
                      widget: "string",
                    },
                  ],
                },
                {
                  label: "Linkedin",
                  name: "linkedin",
                  widget: "object",
                  fields: [
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
                      label: "Href",
                      name: "href",
                      widget: "string",
                    },
                  ],
                },
                {
                  label: "Slack",
                  name: "slack",
                  widget: "object",
                  fields: [
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
                      label: "Href",
                      name: "href",
                      widget: "string",
                    },
                  ],
                },
              ],
            },
            {
              label: "Page Links",
              name: "page_links",
              widget: "object",
              fields: [
                {
                  label: "Our Work",
                  name: "our_work",
                  widget: "object",
                  fields: [
                    {
                      label: "Title",
                      name: "title",
                      widget: "string",
                    },
                    {
                      label: "Href",
                      name: "href",
                      widget: "string",
                    },
                  ],
                },
                {
                  label: "About",
                  name: "about",
                  widget: "object",
                  fields: [
                    {
                      label: "Title",
                      name: "title",
                      widget: "string",
                    },
                    {
                      label: "Href",
                      name: "href",
                      widget: "string",
                    },
                  ],
                },
                {
                  label: "Stories",
                  name: "stories",
                  widget: "object",
                  fields: [
                    {
                      label: "Title",
                      name: "title",
                      widget: "string",
                    },
                    {
                      label: "Href",
                      name: "href",
                      widget: "string",
                    },
                  ],
                },
                {
                  label: "Opportunities",
                  name: "opportunities",
                  widget: "object",
                  fields: [
                    {
                      label: "Title",
                      name: "title",
                      widget: "string",
                    },
                    {
                      label: "Href",
                      name: "href",
                      widget: "string",
                    },
                  ],
                },
                {
                  label: "Contact",
                  name: "contact",
                  widget: "object",
                  fields: [
                    {
                      label: "Title",
                      name: "title",
                      widget: "string",
                    },
                    {
                      label: "Href",
                      name: "href",
                      widget: "string",
                    },
                  ],
                },
                {
                  label: "Sign Up",
                  name: "sign_up",
                  widget: "object",
                  fields: [
                    {
                      label: "Title",
                      name: "title",
                      widget: "string",
                    },
                    {
                      label: "Href",
                      name: "href",
                      widget: "string",
                    },
                  ],
                },
                {
                  label: "Imprint",
                  name: "imprint",
                  widget: "object",
                  fields: [
                    {
                      label: "Title",
                      name: "title",
                      widget: "string",
                    },
                    {
                      label: "Href",
                      name: "href",
                      widget: "string",
                    },
                  ],
                },
                {
                  label: "Privacy policy",
                  name: "privacy_policy",
                  widget: "object",
                  fields: [
                    {
                      label: "Title",
                      name: "title",
                      widget: "string",
                    },
                    {
                      label: "Href",
                      name: "href",
                      widget: "string",
                    },
                  ],
                },
              ],
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
          name: "description",
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
      name: "guiding_principles",
      label_singular: "Guiding Principle",
      folder: "content/guiding_principles",
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
          name: "description",
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
      label: "Data | Offices",
      name: "offices_addresses",
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
          name: "address",
          widget: "markdown",
        },
      ],
    },
    {
      label: "Data | Our Impact",
      name: "impact",
      label_singular: "Impact",
      folder: "content/our_impact",
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
          name: "description",
          widget: "markdown",
        },
        {
          label: "Count",
          name: "count",
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
          label: "URL",
          name: "href",
          widget: "string",
        },
        {
          label: "External URL",
          name: "externalHref",
          widget: "string",
        },
        {
          label: "Badges",
          name: "badges",
          widget: "object",
          fields: [
            {
              label: "Badge",
              name: "id",
              widget: "relation",
              collection: "badges",
              search_fields: ["title"],
              value_field: "id",
              display_fields: ["title"],
              multiple: true,
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
          name: "link",
          label: "Link",
          widget: "object",
          fields: [
            {
              label: "Title",
              name: "title",
              widget: "string",
            },
            {
              label: "Href",
              name: "href",
              widget: "string",
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
          name: "description",
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
        {
          label: "Href",
          name: "href",
          widget: "string",
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
      ],
    },
  ],
};
