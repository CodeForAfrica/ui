export { default as site } from "./site";

export function formatDate(date) {
  const locales = "en-US";
  const options = { year: "numeric", month: "long", day: "2-digit" };

  return new Date(date).toLocaleDateString(locales, options);
}

export default undefined;
