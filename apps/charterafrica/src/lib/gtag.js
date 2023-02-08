/* eslint-env browser */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const isSet = GA_MEASUREMENT_ID?.length > 0;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export function pageview(url) {
  if (isSet && typeof window !== "undefined") {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export function event({ action, category, label, value }) {
  if (isSet && typeof window !== "undefined") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value,
    });
  }
}
