import getNavigation from "@/codeforafrica/lib/data/common/navigation";

export async function getPageProps(api) {
  const navigation = await getNavigation(api);
  return {
    navbar: navigation,
  };
}

export default getPageProps;
