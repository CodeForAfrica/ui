const formatDate = (date, options = {}) => {
  if (!date?.length) {
    return null;
  }
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }
  const { locale = "en", includeTime, ...restOptions } = options;
  const formatOptions = {
    ...(includeTime
      ? { hour: "numeric", minute: "numeric", second: "2-digit" }
      : {}),
    ...restOptions,
  };
  try {
    const formattedDate = parsedDate.toLocaleString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
      ...formatOptions,
    });
    return formattedDate;
  } catch (error) {
    return null;
  }
};

export default formatDate;
