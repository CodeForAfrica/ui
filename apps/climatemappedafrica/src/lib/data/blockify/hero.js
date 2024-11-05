import {
  fetchProfile,
  fetchProfileGeography,
} from "@/climatemappedafrica/lib/hurumap";

/**
 * This function will be called even when HURUmap is disabled.
 * @see @/climatemappedafrica/lib/data/common/index.js
 *
 * TODO(koech): Handle the case when hurumap?.enabled is undefined/false
 *              Should we hide the map?
 */
export default async function hero(block, _api, _context, { hurumap }) {
  const {
    profilePage,
    rootGeography: { center, code, hasData: pinRootGeography },
    enableHURUMap,
  } = hurumap;
  const { slug: explorePageSlug } = profilePage;
  const { geometries } = await fetchProfileGeography(code.toLowerCase());
  const { level } = geometries.boundary?.properties ?? {};
  const childLevelMaps = {
    continent: "country",
    country: "region",
  };
  const childLevel = childLevelMaps[level];
  const { locations, preferredChildren } = await fetchProfile();
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
    explorePageSlug: enableHURUMap ? explorePageSlug : null,
    featuredLocations,
    level,
    pinRootGeography,
    properties: geometries.boundary?.properties,
    slug: "hero",
  };
}
