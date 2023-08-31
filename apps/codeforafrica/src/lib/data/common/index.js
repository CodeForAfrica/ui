export async function getPageProps(api) {
  const footer = await api.findGlobal("footer");
  return {
    footer,
  };
}

export default getPageProps;
