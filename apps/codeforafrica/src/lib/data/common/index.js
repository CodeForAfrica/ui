export async function getGlobalProps(api) {
  const footer = await api.findGlobal("footer");
  return { footer };
}

export async function getPageProps(api) {
  const globals = await getGlobalProps(api);
  return {
    ...globals,
  };
}

export default getPageProps;
