import { getCollectionBySlug } from "./utils";

function getContactForm() {
  const { "contact-form": contactForm } = getCollectionBySlug(
    "content/pages",
    "contact",
    ["contact-form"]
  ).items;
  const { "embed-code": embedCode } = contactForm || {};
  return { embedCode };
}

export default getContactForm;
