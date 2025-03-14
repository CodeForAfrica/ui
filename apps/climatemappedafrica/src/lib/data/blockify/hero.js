import { generateChoropleth } from "@hurumap/next";

import { fetchCachedProfileGeography } from "@/climatemappedafrica/lib/hurumap";

/**
 * This function will be called even when HURUmap is disabled.
 * @see @/climatemappedafrica/lib/data/common/index.js
 *
 */
export default async function hero(block, _api, _context, { hurumap }) {
  const {
    hurumapUrl,
    profileId,
    profilePage,
    rootGeography: { center, code, hasData: pinRootGeography, zoom },
    profile: hurumapProfile,
  } = hurumap ?? { rootGeography: {} };
  const { geometries } = await fetchCachedProfileGeography(code.toLowerCase(), {
    baseUrl: hurumapUrl,
    profileId,
  });
  const { level } = geometries.boundary?.properties ?? {};
  const childLevelMaps = {
    Continent: "Country",
    Country: "Region",
  };
  const childLevel = childLevelMaps[level];
  const { locations, preferredChildren } = hurumapProfile;
  const chloropleth = hurumapProfile?.choropleth ?? null;
  const { choropleth, legend } = generateChoropleth(
    chloropleth,
    locations,
    "choropleth",
  );
  const preferredChildrenPerLevel = preferredChildren[level];
  const { children } = geometries;
  const preferredLevel =
    preferredChildrenPerLevel?.find((l) => children[l]) ?? null;
  const featuredLocations = locations.filter(
    (location) => location.level === childLevel,
  );
  const boundary = children[preferredLevel];

  return {
    ...block,
    boundary,
    center,
    explorePageSlug: profilePage?.slug || null,
    featuredLocations,
    level,
    pinRootGeography,
    properties: geometries.boundary?.properties,
    slug: "hero",
    choropleth,
    legend,
    zoom,
  };
}
