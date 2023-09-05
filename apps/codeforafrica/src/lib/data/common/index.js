import getNavigation from "@/codeforafrica/lib/data/common/navigation";

export async function getPageProps(api) {
  const footer = await api.findGlobal("footer");
  const navigation = await getNavigation(api);
  return {
    footer,
    navbar: navigation,
  };
}

export default getPageProps;
