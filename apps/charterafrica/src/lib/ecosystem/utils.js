export function localizeData(data = {}) {
  const getValue = (value, locale) => {
    if (value?.[locale] !== undefined) {
      return value?.[locale];
    }
    if (value?.en !== undefined) {
      return value?.en;
    }
    return value;
  };
  return Object.keys(data).reduce(
    (result, key) => ({
      ...result,
      en: {
        ...result.en,
        [key]: getValue(data[key], "en"),
      },
      pt: {
        ...result.pt,
        [key]: getValue(data[key], "pt"),
      },
      fr: {
        ...result.fr,
        [key]: getValue(data[key], "fr"),
      },
    }),
    { en: {}, pt: {}, fr: {} }
  );
}

export function delocalize(data) {
  return data.en;
}
