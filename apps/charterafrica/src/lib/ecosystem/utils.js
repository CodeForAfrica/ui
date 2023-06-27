export function localizeData(data = {}) {
  return Object.keys(data).reduce(
    (result, key) => ({
      ...result,
      en: {
        ...result.en,
        [key]: data[key].en || data[key],
      },
      pt: {
        ...result.pt,
        [key]: data[key].pt || data[key],
      },
      fr: {
        ...result.fr,
        [key]: data[key].fr || data[key],
      },
    }),
    { en: {}, pt: {}, fr: {} }
  );
}

export function delocalize(data) {
  return data.en;
}
