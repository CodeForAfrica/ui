import { Field } from "payload/types";
import richText from "../fields/richText";

const ExistingRobots: Field = {
  type: "collapsible",
  label: "Existing Robots",
  fields: [
    {
      name: "existingRobots",
      label: "Existing Robots",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          defaultValue: "Existing Robots",
        },
        richText({
          name: "description",
          defaultValue: [
            {
              children: null,
              text: "Start by fetching the robots.txt file of the website you want to generate robots for.",
            },
          ],
        }) as unknown as Field,
        {
          name: "labels",
          label: "Labels",
          type: "group",
          fields: [
            {
              name: "existingRobotsTxt",
              type: "text",
              required: true,
              defaultValue: "Fetch existing robots.txt",
            },
            {
              name: "placeholder",
              type: "text",
              required: true,
              defaultValue: "Enter site URL e.g https://example.com",
            },
          ],
        },
      ],
    },
  ],
};

const Delays: Field = {
  type: "collapsible",
  label: "Delays",
  fields: [
    {
      name: "delays",
      label: "Delays",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          defaultValue: "Delays",
        },
        richText({
          name: "description",
          defaultValue: [
            {
              children: null,
              text: "You can set bot delays for the robots you want to generate.",
            },
          ],
        }) as unknown as Field,
        {
          name: "labels",
          label: "Labels",
          type: "group",
          fields: [
            {
              name: "crawlDelay",
              type: "group",
              fields: [
                {
                  name: "label",
                  type: "text",
                  required: true,
                  defaultValue: "Crawl delay",
                },
                {
                  name: "title",
                  type: "text",
                  required: true,
                  defaultValue:
                    "The crawl delay directive specifies the minimum time between requests to your server from a bot.",
                },
              ],
            },
            {
              name: "cacheDelay",
              type: "group",
              fields: [
                {
                  name: "label",
                  type: "text",
                  required: true,
                  defaultValue: "Cache delay",
                },
                {
                  name: "title",
                  type: "text",
                  required: true,
                  defaultValue:
                    "The cache delay directive specifies the time that a cached copy of a page should be considered fresh.",
                },
              ],
            },
            {
              name: "visitTime",
              type: "group",
              fields: [
                {
                  name: "label",
                  type: "text",
                  required: true,
                  defaultValue: "Visit time",
                },
                {
                  name: "title",
                  type: "text",
                  required: true,
                  defaultValue:
                    "The visit time directive specifies the time of day when a bot should visit your site.",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const Paths: Field = {
  type: "collapsible",
  label: "Paths",
  fields: [
    {
      name: "paths",
      label: "Paths",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          defaultValue: "Paths",
        },
        richText({
          name: "description",
          defaultValue: [
            {
              text: "You can set disallowed and allowed paths for the robots you want to generate. All paths should be relative to the root of your site and end with a /",
              children: null,
            },
          ],
        }) as unknown as Field,
        {
          name: "labels",
          label: "Labels",
          type: "group",
          fields: [
            {
              name: "selectPlatform",
              type: "group",
              fields: [
                {
                  name: "label",
                  type: "text",
                  required: true,
                  defaultValue: "Select platform",
                },
                {
                  name: "title",
                  type: "text",
                  required: true,
                  defaultValue:
                    "Select the platform your website is built on to generate the correct robots.txt file.",
                },
              ],
            },
            {
              name: "disallowedPaths",
              type: "group",
              fields: [
                {
                  name: "label",
                  type: "text",
                  required: true,
                  defaultValue: "Disallowed paths",
                },
                {
                  name: "title",
                  type: "text",
                  required: true,
                  defaultValue:
                    "The disallowed paths directive specifies the paths that a bot should not visit.",
                },
              ],
            },
            {
              name: "allowedPaths",
              type: "group",
              fields: [
                {
                  name: "label",
                  type: "text",
                  required: true,
                  defaultValue: "Allowed Paths",
                },
                {
                  name: "title",
                  type: "text",
                  required: true,
                  defaultValue:
                    "The allowed paths directive specifies the paths that a bot should visit.",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const BlockBots: Field = {
  type: "collapsible",
  label: "Block Bots",
  fields: [
    {
      name: "blockBots",
      label: "Block Bots",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          defaultValue: "Block Bots",
        },
        richText({
          name: "description",
          defaultValue: [
            {
              text: "Select bots you want to block from crawling your website.",
              children: null,
            },
          ],
        }) as unknown as Field,
        {
          name: "labels",
          label: "Labels",
          type: "group",
          fields: [
            {
              name: "aiWebCrawlers",
              type: "group",
              fields: [
                {
                  name: "label",
                  type: "text",
                  required: true,
                  defaultValue: "AI Web Crawlers",
                },
                {
                  name: "title",
                  type: "text",
                  required: true,
                  defaultValue:
                    "AI Web Crawlers are automated programs, that systematically browse the internet, indexing content for search engines and retrieving data from web pages. The information they gather can be used to train different models. You might want to block them if you're concerned about attribution or how your creative work could be used in the resulting AI model",
                },
              ],
            },
            {
              name: "searchEngineCrawlers",
              type: "group",
              fields: [
                {
                  name: "label",
                  type: "text",
                  required: true,
                  defaultValue: "Search Engine Crawlers",
                },
                {
                  name: "title",
                  type: "text",
                  required: true,
                  defaultValue:
                    "Search engine crawlers are used to index web content for search engines. Blocking them could prevent your website from being discovered by users.",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
const SiteMaps: Field = {
  type: "collapsible",
  label: "Site Maps",
  fields: [
    {
      name: "siteMaps",
      label: "Site Maps",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          defaultValue: "Site Maps",
        },
        richText({
          name: "description",
          defaultValue: [
            {
              text: "You can add sitemap URLs to your robots.txt file.",
              children: null,
            },
          ],
        }) as unknown as Field,
        {
          type: "group",
          name: "labels",
          fields: [
            {
              name: "placeholder",
              type: "text",
              required: true,
              defaultValue: "Enter sitemap URLs each URL on a new line",
            },
          ],
        },
      ],
    },
  ],
};

const Finish: Field = {
  type: "collapsible",
  label: "Finish",
  fields: [
    {
      name: "finish",
      label: "Finish",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          defaultValue: "Finish",
        },
        richText({
          name: "description",
          defaultValue: [
            {
              children: null,
              text: "Your robots.txt file has been generated successfully. You can now copy the code or download the file.",
            },
          ],
        }) as unknown as Field,
        {
          type: "group",
          name: "labels",
          fields: [
            {
              name: "placeholder",
              type: "text",
              required: true,
              defaultValue:
                "# Disallow specifies the paths that are not allowed to be crawled by the robot.",
            },
          ],
        },
      ],
    },
  ],
};

const Labels: Field = {
  type: "collapsible",
  label: "Labels",
  fields: [
    {
      type: "group",
      name: "labels",
      fields: [
        {
          name: "fetch",
          type: "text",
          required: true,
          defaultValue: "Fetch",
        },
        {
          name: "continue",
          type: "text",
          required: true,
          defaultValue: "Continue",
        },
        {
          name: "back",
          type: "text",
          required: true,
          defaultValue: "Back",
        },
        {
          name: "reset",
          type: "text",
          required: true,
          defaultValue: "Reset",
        },
        {
          name: "download",
          type: "text",
          required: true,
          defaultValue: "Download",
        },
        {
          name: "copyToClipboard",
          type: "text",
          required: true,
          defaultValue: "Copy to Clipboard",
        },
      ],
    },
  ],
};
const RoboForm = {
  slug: "robo-form",
  labels: { singular: "Robo Form", plural: "Robo Form" },
  fields: [ExistingRobots, Delays, Paths, BlockBots, SiteMaps, Finish, Labels],
};

export default RoboForm;
