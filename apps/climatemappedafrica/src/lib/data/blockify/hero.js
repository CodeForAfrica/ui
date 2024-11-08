import {
  fetchProfile,
  fetchProfileGeography,
} from "@/climatemappedafrica/lib/hurumap";

/**
 * This function will be called even when HURUmap is disabled.
 * @see @/climatemappedafrica/lib/data/common/index.js
 *
 */
export default async function hero(block, _api, _context, { hurumap }) {
  const {
    hurumapAPIURL,
    profileId,
    profilePage,
    rootGeography: { center, code, hasData: pinRootGeography },
  } = hurumap ?? { rootGeography: {} };
  const { geometries } = await fetchProfileGeography(code.toLowerCase());
  const { level } = geometries.boundary?.properties ?? {};
  const childLevelMaps = {
    continent: "country",
    country: "region",
  };
  const childLevel = childLevelMaps[level];
  const { locations, preferredChildren } = await fetchProfile(
    hurumapAPIURL,
    profileId,
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
  };
}
