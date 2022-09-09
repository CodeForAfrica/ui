import { getCollectionBySlug } from "./utils";

const FIELD_NAME = "contact-form";

function getContactForm() {
  const contactForm = getCollectionBySlug("content/pages", "contact", [
    FIELD_NAME,
    "slug",
  ]).items[FIELD_NAME];
  const { "embed-code": embedCode, slug } = contactForm || {};

  return { embedCode, slug };
}

export default getContactForm;
