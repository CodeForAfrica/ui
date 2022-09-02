/* eslint-disable import/prefer-default-export */

function isExternalUrl(url) {
  return (
    typeof url === "string" &&
    (url.indexOf("http") === 0 || url.indexOf("mailto:") === 0)
  );
}

export default isExternalUrl;
