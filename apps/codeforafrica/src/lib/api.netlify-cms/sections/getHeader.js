import getSettings from "./getSettings";

export default function getHeader() {
  const { logo, "main-navigation": menu } = getSettings("header");

  return { logo, menu };
}
