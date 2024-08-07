import processFeaturedVideos from "./processBlockFeaturedVideos";

const processHero = (page) => {
  const { blocks } = page;
  const heroIndex = blocks.findIndex((block) => block.slug === "hero");

  const hero = blocks[heroIndex] ?? null;
  if (hero) {
    const heroSlides = hero?.slides?.map((slide) => {
      const { background, links, ...other } = slide;
      const formattedLinks = links.map((link) => {
        const { color, icon, href, label } = link;
        return {
          color,
          label,
          icon: { alt: icon.alt, src: icon.url },
          href,
        };
      });

      return {
        background: {
          blendMode: background.blendMode.join(","),
          color: background.color,
          src: background.image.url,
        },
        links: formattedLinks,
        ...other,
      };
    });

    hero.slides = heroSlides || null;
    blocks[heroIndex] = hero;
  }
};

const processSpotlight = (page, api, context) => {
  const { blocks } = page;
  const { locale } = context;
  let spotlightIndex = -1;
  const indexOfSpotlightBlock = ({ slug }, i) =>
    slug === "spotlight" && i > spotlightIndex;
  spotlightIndex = blocks.findIndex(indexOfSpotlightBlock);
  while (spotlightIndex > -1) {
    const spotlight = blocks[spotlightIndex];
    const spotlightItems = spotlight?.items?.map((item) => {
      const { item: itemData, ...rest } = item;
      return {
        ...rest,
        category: rest?.category || null,
        item: {
          ...itemData,
          image: {
            alt: itemData.image.alt,
            url: itemData.image.url,
          },
          date: new Date(itemData.date).toLocaleDateString(locale, {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          link: {
            href: itemData?.link.href || "#", // TODO: handle reference links
          },
        },
      };
    });

    spotlight.items = spotlightItems || null;
    blocks[spotlightIndex] = spotlight;
    spotlightIndex = blocks.findIndex(indexOfSpotlightBlock);
  }
};

const processMooc = (page) => {
  const { blocks } = page;
  const moocIndex = blocks.findIndex((block) => block.slug === "mooc");
  if (moocIndex > -1) {
    const mooc = blocks[moocIndex];
    if (mooc?.image?.url) {
      mooc.image = {
        alt: mooc.image.alt,
        src: mooc.image.url,
      };
    }
    blocks[moocIndex] = mooc;
  }
};

async function processPageIndex(page, api, context) {
  processHero(page);
  processMooc(page);
  processSpotlight(page, api, context);
  const processedPage = await processFeaturedVideos(page, context.locale);
  return processedPage;
}

export default processPageIndex;
