function localize(data, locales = ["en"]) {
  const getValue = (value, locale) => {
    return value?.[locale] ?? value;
  };

  return locales.reduce((loc, locale) => {
    const localizedData = loc;
    localizedData[locale] = {};
    Object.keys(data).reduce((locData, key) => {
      const localeData = locData;
      localeData[key] = getValue(data[key], locale);
      return localeData;
    }, localizedData[locale]);
    return localizedData;
  }, {});
}

export default { localize };
