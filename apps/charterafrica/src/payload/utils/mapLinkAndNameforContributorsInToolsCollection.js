import getPageUrlUsingPayload from "./getPageUrlUsingPayload";

const mapLinkAndNameforContributorsInToolsCollection = async ({
  doc,
  req: { payload },
}) => {
  try {
    const docContributors = { ...doc };
    const contributorPage = await getPageUrlUsingPayload(
      payload,
      "contributors",
    );
    docContributors.contributors = docContributors?.contributors?.map(
      (person) => ({
        ...person,
        link: { href: `${contributorPage}/${person.slug}` },
        name: person.name || person?.fullName || person.username || null,
      }),
    );

    return docContributors;
  } catch (error) {
    const docContributors = { ...doc };
    docContributors.contributors = [];
    return docContributors; // or handle the error in an appropriate way
  }
};

export default mapLinkAndNameforContributorsInToolsCollection;
