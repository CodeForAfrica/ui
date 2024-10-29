import {
  fetchProfile,
  fetchProfileGeography,
} from "@/climatemappedafrica/lib/hurumap";

async function explorePage({ block: { slugs }, hurumap }) {
  const {
    rootGeography,
    align,
    anchor,
    lazyblock,
    blockUniqueClass,
    ghostkitSpacings,
    ghostkitSR,
    scrollToTopLabel,
    dataNotAvailable,
    items: panelItems,
    page: { value },
  } = hurumap;
  const { code: name } = rootGeography;
  const code = slugs.length ? slugs[0] : name;
  const hurumapProfile = await fetchProfile();

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

  // TODO: Move this to a PayloadCMS
  const panel = {
    panelItems,
    scrollToTopLabel,
    dataNotAvailable,
    lazyblock,
    align,
    anchor,
    blockId: "explore-page",
    blockUniqueClass,
    ghostkitSpacings,
    ghostkitSR,
  };
  const res = {
    id: "explore-page",
    blockType: "explore-page",
    choropleth,
    rootGeography,
    explorePagePath: value.slug,
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
