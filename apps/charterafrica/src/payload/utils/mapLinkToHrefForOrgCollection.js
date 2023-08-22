import getPageUrlUsingPayload from "../../lib/data/common/getPageUrlUsingPayload";

const mapLinkToHrefForOrgCollection = async ({ data, req: { payload } }) => {
  try {
    const doc = { ...data.doc };
    const organisationPage = await getPageUrlUsingPayload(
      payload,
      "organisations",
    );
    const href = `${organisationPage}/${doc?.slug}`;

    return href;
  } catch (error) {
    return null; // or handle the error in an appropriate way
  }
};

export default mapLinkToHrefForOrgCollection;
