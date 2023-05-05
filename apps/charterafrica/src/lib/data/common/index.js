import processPageAbout from "@/charterafrica/lib/data/common/processPageAbout";
import processPageArticles, {
  processPageEvents,
} from "@/charterafrica/lib/data/common/processPageArticles";
import processPageConsultation from "@/charterafrica/lib/data/common/processPageConsultation";
import processPageDatasets from "@/charterafrica/lib/data/common/processPageDatasets";
import processPageExplainers from "@/charterafrica/lib/data/common/processPageExplainers";
import processPageIndex from "@/charterafrica/lib/data/common/processPageIndex";
import processPageOpportunities, {
  processPageFellowships,
  processPageGrants,
} from "@/charterafrica/lib/data/common/processPageOpportunities";
import processPagePrivacyPolicy from "@/charterafrica/lib/data/common/processPagePrivacyPolicy";
import { getPageSeoFromMeta } from "@/charterafrica/lib/data/seo";

export async function getGlobalProps({ locale, defaultLocale }, api) {
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

const processPageFunctionsMap = {
  about: processPageAbout,
  consultation: processPageConsultation,
  data: processPageDatasets,
  explainers: processPageExplainers,
  events: processPageEvents,
  fellowships: processPageFellowships,
  grants: processPageGrants,
  opportunities: processPageOpportunities,
  index: processPageIndex,
  news: processPageArticles,
  research: processPageArticles,
  "privacy-policy": processPagePrivacyPolicy,
};

async function processGlobalBlockFocalCountries(block) {
  return block;
}

async function processGlobalBlockHelpdesk(block) {
  const { description, image, link, slug, title } = block || {};
  if (!title?.length) {
    return null;
  }

  const helpdesk = { slug, title };
  if (description?.length) {
    helpdesk.description = description;
  }
  if (image?.url?.length) {
    helpdesk.image = {
      url: image.url,
    };
    if (image.alt?.length) {
      helpdesk.image.alt = image.alt;
    }
  }
  if (link?.label?.length) {
    helpdesk.link = {
      label: link.label,
    };
    if (link.href?.length) {
      helpdesk.link.href = link.href;
    }
  }
  return helpdesk;
}

const processGlobalBlockFunctionsMap = {
  "focal-countries": processGlobalBlockFocalCountries,
  helpdesk: processGlobalBlockHelpdesk,
};

function getPageSlug({ params }) {
  const slugsCount = params?.slugs?.length;
  // count < 3, page slug is the last slug e.g. ["about"] or ["knowldge/news"]
  // count == 3, page slug is the 2nd slug (index 1); last slug (index 3)
  //             is the post. e.g. opportunities/grants/democratic-governance-in-zambia
  const pageSlugIndex = slugsCount < 3 ? slugsCount - 1 : 1;
  return params?.slugs?.[pageSlugIndex] || "index";
}

export async function getPageProps(api, context) {
  const { defaultLocale, locale, locales, params } = context;
  const fallbackLocale = defaultLocale;
  const slug = getPageSlug(context);
  const pathname = slug !== "index" ? `/${params.slugs.join("/")}` : "/";

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
            const processGlobalBlock = processGlobalBlockFunctionsMap[block];
            return processGlobalBlock?.(foundBlock) ?? null;
          }
        }
        return null;
      })
    )) || [];
  const processPage = processPageFunctionsMap[page.slug];
  const processedPage = processPage
    ? await processPage(page, api, context)
    : page;
  if (!processedPage) {
    return null;
  }

  const { settings, ...globalProps } = await getGlobalProps(
    { defaultLocale, locale },
    api
  );
  const seo = getPageSeoFromMeta(processedPage, settings, {
    locale,
    locales,
    pathname,
  });
  return {
    ...globalProps,
    ...processedPage,
    seo,
  };
}

export default getPageProps;
