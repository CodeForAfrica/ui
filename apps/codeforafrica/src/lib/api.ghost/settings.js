import camelcaseKeys from "camelcase-keys";

import initializeContentAPI from "@/codeforafrica/lib/api.ghost/ghost";

export default async function getSettings() {
  // TODO: Does this require caching?
  const api = initializeContentAPI();
  const settings = await api.settings.browse();

  const transformedSettings = camelcaseKeys(settings, { deep: true });

  return transformedSettings;
}
