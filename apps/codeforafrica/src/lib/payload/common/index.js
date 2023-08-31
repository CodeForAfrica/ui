import getNavigation from "@/codeforafrica/lib/payload/common/navigation";

export default async function getPageProps(api) {
  const navigation = await getNavigation(api);
  return {
    navbar: navigation,
  };
}
