import {
  fetchProfile,
  fetchProfileGeography,
} from "@/climatemappedafrica/lib/hurumap";

export default async function hero(block) {
  const { geometries } = await fetchProfileGeography("af");
  const { locations } = await fetchProfile();
  const featuredLocations = locations.filter(
    ({ level }) => level === "country",
  );

  const { children } = geometries;
  return {
    ...block,
    slug: "page-hero",
    boundary: children?.country ?? null,
    featuredLocations,
  };
}
