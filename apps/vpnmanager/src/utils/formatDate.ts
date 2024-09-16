const formatDateTime = (
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

export function formatDate(date?: Date): string | void {
  if (!date) {
    return;
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default formatDateTime;
