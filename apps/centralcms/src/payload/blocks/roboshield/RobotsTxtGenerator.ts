import { Block, Field, Validate, ValidateOptions } from "payload";
import richText from "@/custom-fields/RichText";
import { blocks } from "node_modules/payload/dist/fields/validations";

const validateSteps: Validate = (value = [], args: any) => {
  const requiredSteps: string[] = ["finish"];
  const missingSteps = requiredSteps.filter(
    (slug) =>
      !value?.find(
        ({ blockType }: { blockType: string }) => blockType === slug,
      ),
  );
  if (missingSteps.length) {
    return `The following steps are missing: ${missingSteps.join(", ")}`;
  }
  const robotsTxtBlockIndex = value.findIndex(
    ({ blockType }: { blockType: string }) =>
      blockType === "existing-robots-txt",
  );
  if (robotsTxtBlockIndex > 0) {
    return "Existing Robots Txt step should appear first";
  }
  const lastBlock = value[value.length - 1];
  if (lastBlock?.blockType !== "finish") {
    return "Finish Step should appear last";
  }
  return blocks(value, args);
};

const ExistingRobots: Block = {
  slug: "existing-robots-txt",
  labels: { singular: "Existing Robots Txt", plural: "Existing Robots Txt" },
  imageURL: "/images/cms/blocks/roboshield/existingRobots.png",
  imageAltText: "Fetch existing robots.txt",
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
          children: [
            {
              text: "Start by fetching the robots.txt file of the website you want to generate robots for.",
            },
          ],
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
  imageURL: "/images/cms/blocks/roboshield/delays.png",
  imageAltText: "Set bot delays for the robots you want to generate.",
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
          children: [
            {
              text: "You can set bot delays for the robots you want to generate.",
            },
          ],
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
  imageURL: "/images/cms/blocks/roboshield/paths.png",
  imageAltText:
    "Set disallowed and allowed paths for the robots you want to generate.",
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
          children: [
            {
              text: "You can set disallowed and allowed paths for the robots you want to generate. All paths should be relative to the root of your site and end with a /",
            },
          ],
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
  imageURL: "/images/cms/blocks/roboshield/blockBots.png",
  imageAltText: "Select bots you want to block from crawling your website.",
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
          children: [
            {
              text: "Select bots you want to block from crawling your website.",
            },
          ],
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
  imageURL: "/images/cms/blocks/roboshield/siteMaps.png",
  imageAltText: "Add sitemap URLs to your robots.txt file.",
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
          children: [
            { text: "You can add sitemap URLs to your robots.txt file." },
          ],
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
  imageURL: "/images/cms/blocks/roboshield/finish.png",
  imageAltText: "Completes robots generation process",
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
          children: [
            {
              text: "Your robots.txt file has been generated successfully. You can now copy the code or download the file.",
            },
          ],
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

const Actions: Field = {
  name: "actions",
  label: "Actions",
  type: "group",
  fields: [
    {
      name: "showRobotsTxt",
      type: "text",
      required: true,
      defaultValue: "View current robots.txt file",
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
};
const RobotsTxtGenerator: Block = {
  slug: "robots-txt-generator",
  labels: { singular: "robots.txt Generator", plural: "robots.txt Generator" },
  imageURL: "/images/cms/blocks/roboshield/robotsGenerator.png",
  imageAltText: "Set action labels and content for robots.txt generator.",
  fields: [
    {
      type: "blocks",
      name: "steps",
      blocks: [ExistingRobots, Delays, Paths, BlockBots, SiteMaps, Finish],
      admin: {
        initCollapsed: true,
      },
      validate: validateSteps,
    },
    Actions,
  ],
};

export default RobotsTxtGenerator;
