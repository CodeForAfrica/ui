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
  const { locations } = await fetchProfile();
  const featuredLocations = locations.filter(
    (location) => location.level === childLevel,
  );

  const { children } = geometries;
  const boundary =
    level === "country"
      ? children.Region || children.County || null
      : (children[childLevel] ?? null);
  return {
    ...block,
    slug: "hero",
    boundary,
    featuredLocations,
    level,
    properties: geometries.boundary?.properties,
  };
}
