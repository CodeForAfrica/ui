import { getPageSeoFromMeta } from "@/charterafrica/lib/data/seo";

async function getGlobalProps({ locale, defaultLocale }, api) {
  const settings = await api.findGlobal("settings", {
    locale,
    fallbackLocale: defaultLocale,
  });
  const { languages } = settings;
  const { actions, menus } = await api.findGlobal("navigation", {
    locale,
    fallbackLocale: defaultLocale,
  });
  const navbar = {
    actions,
    languages: languages ?? null,
    logo: {
      alt: "Charter Africa",
      src: "/images/charter-logo.svg",
      href: "/",
      priority: true,
    },
    menus: menus ?? null,
  };
  const footer = await api.findGlobal("footer", {
    locale,
    fallbackLocale: defaultLocale,
  });

  return { footer, navbar, settings };
}

export async function processPageExplainers({ title, blocks }, api) {
  const collection = await api.getCollection("explainers");
  const explainers = collection.docs || null;

  if (explainers?.length) {
    blocks.push({
      slug: "explainers",
      title,
      explainers,
    });
  }
}

export async function processPageNews({ blocks }) {
  // TODO(kilemensi): Pull data from CMS
  blocks.push({
    slug: "news",
    title: "News",
    articles: Array.from({ length: 30 }, (_, i) => ({
      id: i,
      title: "News story title goes here and spans over second line. "
        .repeat((i % 2) + 1)
        .trim(),
      author: "Sakwa G",
      date: "2023-02-11",
      image: {
        id: "63d2622aafe25f6469605eae",
        alt: `News Story ${i}`,
        prefix: "media",
        filename: "Rectangle 113.jpg",
        mimeType: "image/jpg",
        filesize: 257010,
        width: 1236,
        height: 696,
        createdAt: "2023-01-26T11:21:14.868Z",
        updatedAt: "2023-01-26T11:21:14.868Z",
        url: "http://localhost:3000/images/Rectangle 113.jpg",
      },
    })),
  });
}

export async function processPageResearch({ blocks }) {
  // TODO(kilemensi): Pull data from CMS
  blocks.push({
    slug: "research",
    title: "Research",
    articles: Array.from({ length: 30 }, (_, i) => ({
      id: i,
      title: "Research title goes here and spans over second line. "
        .repeat((i % 2) + 1)
        .trim(),
      author: "Sakwa G",
      date: "2023-02-11",
      image: {
        id: "63d2622aafe25f6469605eae",
        alt: `Research ${i}`,
        prefix: "media",
        filename: "Rectangle 113.jpg",
        mimeType: "image/jpg",
        filesize: 257010,
        width: 1236,
        height: 696,
        createdAt: "2023-01-26T11:21:14.868Z",
        updatedAt: "2023-01-26T11:21:14.868Z",
        url: "http://localhost:3000/images/Rectangle 113.jpg",
      },
    })),
  });
}

const pageBlocksProcessFunctionMap = {
  explainers: processPageExplainers,
  news: processPageNews,
  research: processPageResearch,
};

async function processGlobalBlockFocalCountries(block) {
  return block;
}

async function processGlobalBlockHelpdesk(block) {
  const helpdesk = { ...block };
  const { alt: imageAlt, url: imageSrc } = block.image || {
    alt: null,
    url: null,
  };
  helpdesk.image = { alt: imageAlt, src: imageSrc };
  const { href: linkHref, label: linkLabel } = helpdesk.link;
  helpdesk.link = { href: linkHref ?? null, label: linkLabel ?? null };
  return helpdesk;
}

const globalBlocksProcessFunctionMap = {
  "focal-countries": processGlobalBlockFocalCountries,
  helpdesk: processGlobalBlockHelpdesk,
};

export async function getPageProps(context, api) {
  const { defaultLocale, locale, locales, params } = context;
  const fallbackLocale = defaultLocale;
  const slugLength = params.slug?.length;
  const slug = slugLength ? params.slug[slugLength - 1] : "index";
  // NOTE: we don't use .join because it doesn't put separator first
  const pathname = slugLength
    ? params.slug.reduce((acc, curr) => `${acc}/${curr}`, "")
    : "/";

  const { docs: pages } = await api.findPage(slug, {
    locale,
    fallbackLocale,
  });
  if (!pages?.length) {
    return null;
  }

  const [page] = pages;
  page.blocks =
    (await Promise.all(
      page.blocks?.map(async ({ block, blockType, ...other }) => {
        if (blockType !== "global") {
          return {
            ...other,
            slug: blockType,
          };
        }
        if (block) {
          const foundBlock = await api.findGlobal(block, {
            locale,
            fallbackLocale,
          });
          if (foundBlock) {
            foundBlock.slug = block;
            const processGlobalBlock = globalBlocksProcessFunctionMap[block];
            return processGlobalBlock?.(foundBlock) ?? null;
          }
        }
        return null;
      })
    )) || [];
  const processPage = pageBlocksProcessFunctionMap[page.slug];
  if (processPage) {
    processPage(page, api);
  }
  const { settings, ...globalProps } = await getGlobalProps(
    { defaultLocale, locale },
    api
  );
  const seo = getPageSeoFromMeta(page, settings, {
    locale,
    locales,
    pathname,
  });
  return {
    ...globalProps,
    ...page,
    seo,
  };
}
