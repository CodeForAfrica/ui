import { fetchCachedProfileGeography } from "@/climatemappedafrica/lib/hurumap";

/**
 * This function will be called only when HURUmap is enabled.
 * @see @/climatemappedafrica/lib/data/common/index.js
 */
async function explorePage(block, _api, _context, { hurumap }) {
  const {
    hurumapUrl,
    items: panelItems,
    labels: { dataNotAvailable, scrollToTop: scrollToTopLabel },
    profile: hurumapProfile,
    profileId,
    profilePage,
    rootGeography,
  } = hurumap;
  const { code: name } = rootGeography;
  const { slugs } = block;
  const code = slugs.length ? slugs[0] : name;

  const { locations, preferredChildren, mapType, choropleth } = hurumapProfile;

  const locationCodes = locations.map(({ code: locationCode }) => locationCode);
  const geoCodes = code
    .split("-vs-")
    .map((c) => c.trim())
    .filter((c) => c);
  if (!geoCodes.every((gC) => locationCodes.includes(gC))) {
    return {
      blockType: "error",
      description: [
        {
          children: [
            {
              text: `Region "${code}" not found`,
            },
          ],
        },
      ],
      title: "Region Not Found",
      statusCode: 404,
      link: {
        href: profilePage.slug,
        label: "Go to Explore page",
      },
    };
  }

  const fetchProfiles = async (codes) => {
    const profilePromises = codes.map((c) =>
      fetchCachedProfileGeography(c, {
        baseUrl: hurumapUrl,
        profileId,
      }),
    );
    return Promise.all(profilePromises);
  };

  const profile = await fetchProfiles(geoCodes);

  const panel = {
    panelItems,
    scrollToTopLabel,
    dataNotAvailable,
  };
  const res = {
    id: "explore-page",
    blockType: "explore-page",
    choropleth,
    hurumapUrl,
    profileId,
    rootGeography,
    explorePagePath: profilePage.slug,
    locations,
    mapType,
    panel,
    profile,
    variant: "explore",
    preferredChildren,
  };

  return res;
}

export default explorePage;
