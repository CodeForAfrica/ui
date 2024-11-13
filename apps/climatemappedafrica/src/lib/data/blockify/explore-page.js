import { fetchProfileGeography } from "@/climatemappedafrica/lib/hurumap";

/**
 * This function will be called only when HURUmap is enabled.
 * @see @/climatemappedafrica/lib/data/common/index.js
 */
async function explorePage(block, _api, _context, { hurumap }) {
  const {
    items: panelItems,
    labels: { dataNotAvailable, scrollToTop: scrollToTopLabel },
    profile: hurumapProfile,
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
      notFound: true,
    };
  }

  const [primaryCode, secondaryCode] = geoCodes;
  const primaryProfile = await fetchProfileGeography(primaryCode);
  const profile = [primaryProfile];
  if (secondaryCode) {
    const secondaryProfile = await fetchProfileGeography(secondaryCode);
    profile.push(secondaryProfile);
  }

  const panel = {
    panelItems,
    scrollToTopLabel,
    dataNotAvailable,
  };
  const res = {
    id: "explore-page",
    blockType: "explore-page",
    choropleth,
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
