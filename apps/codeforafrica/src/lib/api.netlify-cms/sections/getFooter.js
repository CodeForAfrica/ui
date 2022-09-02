import { marked } from "marked";

import getSettings from "./getSettings";

export default function getFooter() {
  const {
    description,
    logo,
    "main-navigation": menu,
    "newsletter-subscription": newsletterSubscription,
    "secondary-navigation": secondaryMenu,
    "stay-in-touch": stayInTouch,
  } = getSettings("footer");

  return {
    description: marked.parseInline(description),
    logo,
    menu,
    secondaryMenu,
    stayInTouch,
    subscription: {
      embedCode: newsletterSubscription["embed-code"],
      title: newsletterSubscription.title,
    },
  };
}
