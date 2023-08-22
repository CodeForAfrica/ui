import getPageUrlUsingPayload from "../../lib/data/common/getPageUrlUsingPayload";

const mapLinkForToolsCollection = async ({ doc, req: { payload } }) => {
  try {
    const toolsPage = await getPageUrlUsingPayload(payload, "tools");
    const href = `${toolsPage}/${doc?.slug}`;

    return { ...doc, link: { href } };
  } catch (error) {
    const docContributors = { ...doc };
    docContributors.link = { href: null };

    return docContributors; // or handle the error in an appropriate way
  }
};

export default mapLinkForToolsCollection;
