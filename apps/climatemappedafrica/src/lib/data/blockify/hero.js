import {
  fetchProfile,
  fetchProfileGeography,
} from "@/climatemappedafrica/lib/hurumap";

export default async function hero(block) {
  const { geometries } = await fetchProfileGeography(
    block.location?.name?.toLowerCase(),
  );
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
    slug: "hero",
    boundary,
    featuredLocations,
    level,
    properties: geometries.boundary?.properties,
  };
}
