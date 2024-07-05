// log the pageview with their URL
export const pageview = (url) => {
  /* eslint-env browser */
  window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    page_path: url,
  });
};

// log specific events happening.
export const event = ({ action, params }) => {
  /* eslint-env browser */
  window.gtag("event", action, params);
};
