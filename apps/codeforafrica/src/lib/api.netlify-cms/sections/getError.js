import getPages from "./getPages";

export default function getError(error) {
  const { title, subtitle } = getPages(error);

  return {
    title,
    subtitle,
  };
}
