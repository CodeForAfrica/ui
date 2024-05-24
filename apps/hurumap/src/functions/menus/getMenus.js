import filterMenusByLocation from "@/hurumap/functions/menus/filterMenusByLocation";
import { fetchProfile } from "@/hurumap/lib/hurumap";
import menuLocations from "@/hurumap/lib/wordpress/_config/menuLocations";

/**
 * Get menu data from WPGraphQL.
 *
 * @param  {object} menus     Query response menu data.
 * @param  {Array}  locations The menu locations as an array.
 * @return {Array}            Returns array of menu objects.
 */
export default async function getMenus(menus, locations = menuLocations) {
  if (!locations.length > 0) {
    return []; // Exit if empty.
  }

  // Filter returned menus by specific menu location.
  const filteredMenus = filterMenusByLocation(menus?.nodes, locations);

  const { locations: featuredLocations } = await fetchProfile();
  const featuredCounties = featuredLocations?.filter(
    ({ level }) => level === "county",
  );

  filteredMenus.counties = featuredCounties;

  return filteredMenus || [];
}
