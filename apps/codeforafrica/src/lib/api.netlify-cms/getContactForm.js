import { getCollectionBySlug } from "./utils";

function getContactForm() {
  const { "contact-form": contactForm, "join-us": joinUs } =
    getCollectionBySlug("content/pages", "contact", [
      "contact-form",
      "join-us",
    ]).items;

  const { "embed-code": embedCode } = contactForm || {};

  return { embedCode, joinUs };
}

export default getContactForm;
