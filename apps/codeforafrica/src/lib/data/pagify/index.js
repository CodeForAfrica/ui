import members from "./members";
import partners from "./partners";
import projects from "./projects";

const COLLECTION_BY_SLUG = {
  partners,
  projects,
  members,
};

async function pagify(parentPage, api, context) {
  const { slug: collection } = parentPage;
  const pageProps = COLLECTION_BY_SLUG[collection];
  return pageProps?.(api, context) ?? null;
}

export default pagify;
