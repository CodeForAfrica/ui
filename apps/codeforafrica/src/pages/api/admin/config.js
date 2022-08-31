const APP_DIRECTORY = process.env.NEXT_PUBLIC_APP_DIRECTORY;

const seoFields = {
  label: "SEO",
  name: "seo",
  widget: "object",
  fields: [
    {
      label: "Title",
      name: "title",
      widget: "string",
      required: false,
    },
    {
      label: "Description",
      name: "description",
      widget: "string",
      required: false,
      pattern: ["^.{1,150}$", "Must be up to 156 characters"],
    },
    {
      label: "Title Template",
      name: "title-template",
      widget: "string",
      hint: "Uses title template from Settings | General if not provided",
      required: false,
    },
    {
      label: "Meta data",
      name: "meta",
      widget: "object",
      hint: "Search engines support",
      fields: [
        {
          label: "Title",
          name: "title",
          widget: "string",
          required: false,
          hint: "Uses page title if not provided",
          pattern: ["^.{1,70}$", "Must be up to 70 characters"],
        },
        {
          label: "Description",
          name: "description",
          widget: "text",
          required: false,
          hint: "Uses page description if not provided",
          pattern: ["^.{1,150}$", "Must be up to 156 characters"],
        },
      ],
    },
    {
      label: "Open Graph",
      name: "open-graph",
      hint: "Facebook, Slack, and other social media platforms",
      widget: "object",
      fields: [
        {
          label: "Title",
          hint: "Uses page title if not provided",
          name: "title",
          widget: "string",
          required: false,
        },
        {
          label: "Description",
          name: "description",
          widget: "string",
          hint: "Uses page description if not provided",
          required: false,
        },
        {
          label: "Images",
          name: "images",
          widget: "list",
          min: 1,
          max: 1,
          required: false,
          fields: [
            {
              name: "url",
              label: "URL",
              widget: "string",
            },
            {
              name: "width",
              label: "Width",
              widget: "string",
            },
            {
              name: "height",
              label: "Height",
              widget: "string",
            },
            {
              name: "alt",
              label: "Alt Text",
              widget: "string",
            },
          ],
        },
      ],
    },
    {
      label: "Twitter",
      name: "twitter",
      widget: "object",
      fields: [
        {
          label: "Handle",
          name: "handle",
          hint: "@username of content creator",
          widget: "string",
          required: false,
          default: "@Code4Africa",
        },
      ],
    },
  ],
};

module.exports = {
  backend: {
    name: "github",
    branch: "main",
    repo: "CodeForAfrica/ui",
    proxy_url: "http://localhost:8081/api/v1", // Set proxy to work on local repo
  },
  media_folder: `${APP_DIRECTORY}public/images`,
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
          file: `${APP_DIRECTORY}content/pages/index.md`,
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
                  label: "Action",
                  name: "action",
                  widget: "object",
                  fields: [
                    {
                      name: "content",
                      widget: "string",
                    },
                    {
                      name: "href",
                      widget: "string",
                    },
                  ],
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
              label: "News and stories",
              name: "news-stories",
              widget: "object",
              collapsed: true,
              summary: "{{fields.title}}",
              fields: [
                {
                  label: "Title",
                  name: "title",
                  widget: "string",
                },
                {
                  label: "Number of stories",
                  name: "articles-count",
                  hint: "Including the featured story",
                  widget: "number",
                  value_type: "int",
                  min: 3,
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
              ],
            },
            {
              ...seoFields,
            },
          ],
        },
        {
          label: "About Us",
          name: "about",
          file: `${APP_DIRECTORY}content/pages/about.md`,
          fields: [
            {
              label: "Hero",
              name: "hero",
              widget: "object",
              collapsed: true,
              summary: "{{fields.title}}",
              fields: [
                {
                  label: "Title",
                  name: "title",
                  widget: "string",
                },
                {
                  label: "Subtitle",
                  name: "subtitle",
                  widget: "text",
                },
                {
                  label: "Background Image",
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
              label: "Our Mission",
              name: "our-mission",
              widget: "object",
              collapsed: true,
              summary: "{{fields.title}}",
              fields: [
                {
                  label: "Title",
                  name: "title",
                  widget: "string",
                },
                {
                  name: "description",
                  widget: "markdown",
                },
              ],
            },
            {
              label: "Guiding Principles",
              name: "guiding-principles",
              widget: "object",
              collapsed: true,
              summary: "{{fields.title}}",
              fields: [
                {
                  label: "Title",
                  name: "title",
                  widget: "string",
                },
                {
                  label: "Guiding Principles",
                  name: "guiding-principle-list",
                  label_singular: "Guiding Principle",
                  widget: "relation",
                  collection: "guiding-principles",
                  search_fields: ["title"],
                  value_field: "id",
                  display_fields: ["title"],
                  multiple: true,
                },
              ],
            },
            {
              label: "Our team",
              name: "our-team",
              widget: "object",
              collapsed: true,
              summary: "{{fields.title}}",
              fields: [
                {
                  label: "Title",
                  name: "title",
                  widget: "string",
                },
              ],
            },
            {
              label: "Our partners",
              name: "our-partners",
              widget: "object",
              collapsed: true,
              summary: "{{fields.title}}",
              fields: [
                {
                  label: "Title",
                  name: "title",
                  widget: "string",
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
              collapsed: true,
              summary: "{{fields.title}}",
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
            {
              label: "Get in touch",
              name: "get-in-touch",
              widget: "object",
              collapsed: true,
              summary: "{{fields.title}}",
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
                  widget: "object",
                  fields: [
                    {
                      name: "content",
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
            {
              ...seoFields,
            },
          ],
        },
        {
          label: "Contact Us",
          name: "contact",
          file: `${APP_DIRECTORY}content/pages/contact.md`,
          fields: [
            {
              label: "Hero",
              name: "hero",
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
              ],
            },
            {
              label: "Contact form",
              name: "contact-form",
              widget: "object",
              fields: [
                {
                  label: "Mailchimp code",
                  name: "embed-code",
                  widget: "code",
                  allow_language_selection: false,
                  default_language: "html",
                  output_code_only: true,
                },
              ],
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
            {
              ...seoFields,
            },
          ],
        },
        {
          label: "Our Work",
          name: "our-work",
          file: `${APP_DIRECTORY}content/pages/our-work.md`,
          fields: [
            {
              label: "Hero",
              name: "hero",
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
              ],
            },
            {
              ...seoFields,
            },
          ],
        },
        {
          label: "Opportunities",
          name: "opportunities",
          file: `${APP_DIRECTORY}content/pages/opportunities.md`,
          fields: [
            {
              label: "Hero",
              name: "hero",
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
              ],
            },
            {
              ...seoFields,
            },
          ],
        },
        {
          label: "Stories",
          name: "stories",
          file: `${APP_DIRECTORY}content/pages/stories.md`,
          fields: [
            {
              ...seoFields,
            },
          ],
        },
        {
          label: "Projects",
          name: "projects",
          file: `${APP_DIRECTORY}content/pages/projects.md`,
          fields: [
            {
              ...seoFields,
            },
          ],
        },
        {
          label: "Imprint",
          name: "imprint",
          file: `${APP_DIRECTORY}content/pages/imprint.md`,
          fields: [
            {
              label: "Hero",
              name: "hero",
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
              ],
            },
            {
              label: "Body",
              name: "body",
              widget: "markdown",
            },
            {
              ...seoFields,
            },
          ],
        },
        {
          label: "Privacy Policy",
          name: "privacy-policy",
          file: `${APP_DIRECTORY}content/pages/privacy-policy.md`,
          fields: [
            {
              label: "Hero",
              name: "hero",
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
              ],
            },
            {
              label: "Body",
              name: "body",
              widget: "markdown",
            },
            {
              ...seoFields,
            },
          ],
        },
        {
          label: "404",
          name: "404",
          file: `${APP_DIRECTORY}content/pages/404.md`,
          fields: [
            {
              label: "Hero",
              name: "hero",
              widget: "object",
              collapsed: true,
              summary: "{{fields.title}}",
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
              ],
            },
            {
              label: "News and stories",
              name: "news-stories",
              widget: "object",
              collapsed: true,
              summary: "{{fields.title}}",
              fields: [
                {
                  label: "Title",
                  name: "title",
                  widget: "string",
                },
                {
                  label: "Number of stories",
                  name: "articles-count",
                  widget: "number",
                  value_type: "int",
                  min: 3,
                },
              ],
            },
            {
              ...seoFields,
            },
          ],
        },
        {
          label: "Error",
          name: "error",
          file: `${APP_DIRECTORY}content/pages/error.md`,
          fields: [
            {
              label: "Hero",
              name: "hero",
              widget: "object",
              collapsed: true,
              summary: "{{fields.title}}",
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
              ],
            },
            {
              label: "News and stories",
              name: "news-stories",
              widget: "object",
              collapsed: true,
              summary: "{{fields.title}}",
              fields: [
                {
                  label: "Title",
                  name: "title",
                  widget: "string",
                },
                {
                  label: "Number of stories",
                  name: "articles-count",
                  widget: "number",
                  value_type: "int",
                  min: 3,
                },
              ],
            },
            {
              ...seoFields,
            },
          ],
        },
      ],
    },
    {
      label: "Data | Badges",
      name: "badges",
      label_singular: "Badge",
      folder: `${APP_DIRECTORY}content/badges`,
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
      folder: `${APP_DIRECTORY}content/donors`,
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
      folder: `${APP_DIRECTORY}content/guiding-principles`,
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
    {
      label: "Data | Impact",
      name: "impact",
      label_singular: "Impact",
      folder: `${APP_DIRECTORY}content/impact`,
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
          label: "Value",
          name: "value",
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
      label: "Data | Offices",
      name: "offices-addresses",
      label_singular: "Office",
      folder: `${APP_DIRECTORY}content/offices`,
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
        {
          label: "Location",
          name: "location",
          widget: "object",
          fields: [
            {
              label: "Latitude",
              name: "latitude",
              widget: "number",
              value_type: "float",
            },
            {
              label: "Longitude",
              name: "longitude",
              widget: "number",
              value_type: "float",
            },
          ],
        },
      ],
    },
    {
      name: "partners",
      label: "Data | Partners",
      folder: `${APP_DIRECTORY}content/partners`,
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

        {
          label: "Links",
          name: "links",
          widget: "object",
          fields: [
            {
              label: "Facebook",
              name: "facebook",
              widget: "string",
              required: false,
            },
            {
              label: "Twitter",
              name: "twitter",
              widget: "string",
              required: false,
            },
            {
              label: "LinkedIn",
              name: "linkedIn",
              widget: "string",
              required: false,
            },
            {
              label: "Instagram",
              name: "instagram",
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
              label: "Slack",
              name: "slack",
              widget: "string",
              required: false,
            },
          ],
        },
      ],
    },
    {
      label: "Data | Projects",
      name: "projects",
      folder: `${APP_DIRECTORY}content/projects`,
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
      folder: `${APP_DIRECTORY}content/team`,
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
              label: "Facebook",
              name: "facebook",
              widget: "string",
              required: false,
            },
            {
              label: "Instagram",
              name: "instagram",
              widget: "string",
              required: false,
            },
            {
              label: "Slack",
              name: "slack",
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
        {
          label: "Deactivated",
          name: "deactivated",
          widget: "boolean",
          default: false,
        },
      ],
    },
    {
      name: "settings",
      label: "Settings",
      files: [
        {
          name: "general",
          label: "General",
          file: `${APP_DIRECTORY}content/settings/general.md`,
          fields: [
            {
              label: "Site",
              name: "site",
              widget: "object",
              fields: [
                {
                  label: "Title",
                  name: "title",
                  widget: "string",
                  hint: "The name of the site",
                },
                {
                  label: "Description",
                  name: "description",
                  widget: "text",
                  required: false,
                  hint: "Helps with search results and when shared in social media platforms",
                },
              ],
            },
            {
              label: "SEO",
              name: "seo",
              widget: "object",
              fields: [
                {
                  label: "Title Template",
                  name: "title-template",
                  widget: "string",
                  hint: '"pre/suffix that should be included with every page. It replaces %s with your title string e.g. "%s | CfA" template will render "About | CfA" in about page with title "About"',
                },
                {
                  label: "Meta data",
                  name: "meta",
                  widget: "object",
                  hint: "Search engines support",
                  fields: [
                    {
                      label: "Title",
                      name: "title",
                      widget: "string",
                      required: false,
                      hint: "Uses page title if not provided",
                      pattern: ["^.{1,70}$", "Must be up to 70 characters"],
                    },
                    {
                      label: "Description",
                      name: "description",
                      widget: "text",
                      required: false,
                      hint: "Uses page description if not provided",
                      pattern: ["^.{1,150}$", "Must be up to 156 characters"],
                    },
                  ],
                },
                {
                  label: "Open Graph",
                  name: "open-graph",
                  widget: "object",
                  fields: [
                    {
                      label: "Title",
                      name: "title",
                      widget: "string",
                      required: false,
                      hint: "Uses page title if not provided",
                    },
                    {
                      label: "Description",
                      name: "description",
                      widget: "string",
                      required: false,
                      hint: "Uses page description if not provided",
                    },
                    {
                      label: "Images",
                      name: "images",
                      widget: "list",
                      max: 1,
                      min: 1,
                      required: false,
                      fields: [
                        {
                          name: "url",
                          label: "URL",
                          widget: "string",
                        },
                        {
                          name: "width",
                          label: "Width",
                          widget: "string",
                        },
                        {
                          name: "height",
                          label: "Height",
                          widget: "string",
                        },
                        {
                          name: "alt",
                          label: "Alt Text",
                          widget: "string",
                        },
                      ],
                    },
                  ],
                },
                {
                  label: "Twitter",
                  name: "twitter",
                  widget: "object",
                  fields: [
                    {
                      label: "@Site",
                      name: "site",
                      widget: "string",
                      required: false,
                      default: "@Code4Africa",
                    },
                    {
                      label: "Card Type",
                      name: "cardType",
                      widget: "hidden",
                      default: "summary_large_image",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Header",
          name: "header",
          file: `${APP_DIRECTORY}content/settings/header.md`,
          fields: [
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
              label: "Main Navigation",
              name: "main-navigation",
              label_singular: "Navigation item",
              widget: "list",
              fields: [
                {
                  label: "Label",
                  name: "content",
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
              label: "Social Media Link",
              name: "social-media-link",
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
                {
                  label: "Mobile Icon",
                  name: "mobile-icon",
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
                  label: "Desktop Icon",
                  name: "desktop-icon",
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
          ],
        },
        {
          label: "Footer",
          name: "footer",
          file: `${APP_DIRECTORY}content/settings/footer.md`,
          fields: [
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
              label: "Description",
              name: "description",
              widget: "text",
            },
            {
              label: "Stay in touch",
              name: "stay-in-touch",
              widget: "object",
              fields: [
                {
                  label: "Title",
                  name: "title",
                  widget: "string",
                },
                {
                  label: "Links",
                  name: "links",
                  label_singular: "Link",
                  widget: "list",
                  fields: [
                    {
                      label: "Label",
                      name: "label",
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
              ],
            },
            {
              label: "Main Navigation",
              name: "main-navigation",
              label_singular: "Navigation item",
              widget: "list",
              fields: [
                {
                  label: "Label",
                  name: "content",
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
              label: "Secondary Navigation",
              name: "secondary-navigation",
              label_singular: "Navigation item",
              widget: "list",
              fields: [
                {
                  label: "Label",
                  name: "content",
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
              label: "Newsletter subscription",
              name: "newsletter-subscription",
              widget: "object",
              fields: [
                {
                  label: "Title",
                  name: "title",
                  widget: "string",
                },
                {
                  label: "Mailchimp code",
                  name: "embed-code",
                  widget: "code",
                  allow_language_selection: false,
                  default_language: "html",
                  output_code_only: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
