import {
  getNavigation,
  getFooter,
} from "@/codeforafrica/lib/data/common/globals";

export async function getPageProps(api) {
  const navigation = await getNavigation(api);
  const footer = await getFooter(api);
  return {
    footer,
    navbar: navigation,
  };
}

export default getPageProps;
