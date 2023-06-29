function localize(data, locales = ["en", "pt", "fr"]) {
  return locales.reduce((loc, locale) => {
    const localized = loc;
    localized[locale] = {};
    Object.keys(data).reduce((locData, key) => {
      const localeData = locData;
      localeData[key] = data[key]?.[locale] ?? data[key]?.en ?? data[key];
      return localeData;
    }, localized[locale]);
    return localized;
  }, {});
}

export default localize;
