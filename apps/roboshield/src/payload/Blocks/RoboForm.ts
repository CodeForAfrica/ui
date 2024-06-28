import { Block, Field } from "payload/types";
import richText from "../fields/richText";

const ExistingRobots: Block = {
  slug: "existing-robots",
  labels: { singular: "Existing Robots", plural: "Existing Robots" },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      defaultValue: "Existing Robots",
    },
    richText({
      name: "hint",
      label: "Hint",
      defaultValue: [
        {
          children: null,
          text: "Start by fetching the robots.txt file of the website you want to generate robots for.",
        },
      ],
    }) as unknown as Field,
    {
      name: "defaultFetchExistingRobots",
      type: "checkbox",
      label: "Fetch Existing Robots",
      defaultValue: false,
    },
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
    {
      name: "urlValidationError",
      type: "text",
      required: true,
      defaultValue:
        "Please enter a valid URL. A valid URL should start with http:// or \nhttps://",
    },
    {
      name: "fetch",
      type: "text",
      required: true,
      defaultValue: "Fetch",
    },
  ],
};

const Delays: Block = {
  slug: "delays",
  labels: { singular: "Delays", plural: "Delays" },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      defaultValue: "Delays",
    },
    richText({
      name: "hint",
      label: "Hint",
      defaultValue: [
        {
          children: null,
          text: "You can set bot delays for the robots you want to generate.",
        },
      ],
    }) as unknown as Field,
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
};

const Paths: Block = {
  slug: "paths",
  labels: { singular: "Paths", plural: "Paths" },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      defaultValue: "Paths",
    },
    richText({
      name: "hint",
      label: "hint",
      defaultValue: [
        {
          text: "You can set disallowed and allowed paths for the robots you want to generate. All paths should be relative to the root of your site and end with a /",
          children: null,
        },
      ],
    }) as unknown as Field,
    {
      name: "selectPlatform",
      label: "Select Platform",
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
};

const BlockBots: Block = {
  slug: "block-bots",
  labels: { singular: "Block Bots", plural: "Block Bots" },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      defaultValue: "Block Bots",
    },
    richText({
      name: "hint",
      defaultValue: [
        {
          text: "Select bots you want to block from crawling your website.",
          children: null,
        },
      ],
    }) as unknown as Field,

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
};

const SiteMaps: Block = {
  slug: "site-maps",
  labels: { singular: "Site Maps", plural: "Site Maps" },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      defaultValue: "Site Maps",
    },
    richText({
      name: "hint",
      defaultValue: [
        {
          text: "You can add sitemap URLs to your robots.txt file.",
          children: null,
        },
      ],
    }) as unknown as Field,
    {
      name: "placeholder",
      type: "text",
      required: true,
      defaultValue: "Enter sitemap URLs each URL on a new line",
    },
  ],
};

const Finish: Block = {
  slug: "finish",
  labels: { singular: "Finish", plural: "Finish" },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      defaultValue: "Finish",
    },
    richText({
      name: "hint",
      defaultValue: [
        {
          children: null,
          text: "Your robots.txt file has been generated successfully. You can now copy the code or download the file.",
        },
      ],
    }) as unknown as Field,
    {
      name: "placeholder",
      type: "text",
      required: true,
      defaultValue:
        "# Disallow specifies the paths that are not allowed to be crawled by the robot.",
    },
  ],
};

const Labels: Field = {
  name: "labels",
  label: "Labels",
  type: "group",
  fields: [
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
};
const RoboForm: Block = {
  slug: "robo-form",
  labels: { singular: "Robo Form", plural: "Robo Form" },
  fields: [
    {
      name: "toolTipText",
      type: "text",
      required: true,
      defaultValue: "View current robots.txt file",
    },
    {
      type: "blocks",
      name: "steps",
      blocks: [ExistingRobots, Delays, Paths, BlockBots, SiteMaps, Finish],
      admin: {
        initCollapsed: true,
      },
    },
    Labels,
  ],
};

export default RoboForm;
