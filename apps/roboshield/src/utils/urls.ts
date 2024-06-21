export const validateUrl = (string: string): boolean => {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
};

export const getRobotsUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    const robotsUrl = `${parsedUrl.protocol}//${parsedUrl.hostname}/robots.txt`;
    return robotsUrl;
  } catch (e) {
    console.error("Invalid URL:", e);
    return null;
  }
};
