export default function sortSocialmediaLinks(links) {
  // sort order of links
  const SocialMediaLinksSortOrder = {
    twitter: 1,
    slack: 2,
    linkedin: 3,
    facebook: 4,
    instagram: 5,
    github: 6,
    default: 1000,
  };

  // sort links by sort order
  return Object.entries(links)
    .sort(([keyA], [keyB]) => {
      const orderA =
        SocialMediaLinksSortOrder[keyA] || SocialMediaLinksSortOrder.default;
      const orderB =
        SocialMediaLinksSortOrder[keyB] || SocialMediaLinksSortOrder.default;
      return orderA - orderB;
    })
    .map((linkArr) => {
      // linkArr is [key, value]
      return {
        type: linkArr[0],
        link: linkArr[1],
      };
    });
}
