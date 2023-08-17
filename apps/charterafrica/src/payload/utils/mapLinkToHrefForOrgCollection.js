import getPageUrl from "../../lib/data/common/getPageUrl";

const mapLinkToHrefForOrgCollection = async ({ data, req: { payload } }) => {
  try {
    const doc = { ...data.doc };

    const organisationPage = await getPageUrl(payload, "organisations");
    const href = `${organisationPage}/${doc?.slug}`;

    return href;
  } catch (error) {
    return null; // or handle the error in an appropriate way
  }
};

export default mapLinkToHrefForOrgCollection;
