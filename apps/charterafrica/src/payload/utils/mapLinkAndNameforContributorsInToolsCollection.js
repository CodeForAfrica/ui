import getPageUrlUsingPayload from "../../lib/data/common/getPageUrlUsingPayload";

const mapLinkAndNameforContributorsInToolsCollection = async ({
  data,
  req: { payload },
}) => {
  try {
    const tool = { ...data.doc };
    const contributorPage = await getPageUrlUsingPayload(
      payload,
      "contributors",
    );
    const contributors = tool?.contributors?.map((person) => ({
      ...person,
      link: { href: `${contributorPage}/${person.slug}` },
      name: person.name || person?.fullName || person.username || null,
    }));

    return contributors;
  } catch (error) {
    return null; // or handle the error in an appropriate way
  }
};

export default mapLinkAndNameforContributorsInToolsCollection;
