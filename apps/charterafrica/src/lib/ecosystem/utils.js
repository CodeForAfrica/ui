function localize(data, locales = ["en"]) {
  const getValue = (value, locale) => {
    if (value?.[locale] !== undefined) {
      return value?.[locale];
    }
    if (value?.en !== undefined) {
      return value?.en;
    }
    return value;
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

export default localize;
