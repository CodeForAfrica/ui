const formatDate = (
  date: string,
  options: { locale: string } & any = {},
): string | null => {
  const { locale = "en", includeTime, ...restOptions } = options;

  const formatOptions = {
    ...(includeTime
      ? { hour: "numeric", minute: "numeric", second: "2-digit" }
      : {}),
    ...restOptions,
  };
  try {
    const formattedDate = new Date(date).toLocaleString(locale, {
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
