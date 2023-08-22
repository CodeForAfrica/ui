import getPageUrlUsingPayload from "./getPageUrlUsingPayload";

const mapLinkToHrefForOrgCollection = async ({ doc, req: { payload } }) => {
  try {
    const organisationPage = await getPageUrlUsingPayload(
      payload,
      "organisations",
    );
    const href = `${organisationPage}/${doc?.slug}`;

    return { ...doc, link: { href } };
  } catch (error) {
    const docContributors = { ...doc };
    docContributors.link = { href: null };

    return docContributors; // or handle the error in an appropriate way
  }
};

export default mapLinkToHrefForOrgCollection;
