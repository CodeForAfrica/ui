function propsifyOrg(buttonLabel) {
  return function propsifyOrgWithButtonLabel(org) {
    // valid org must have at least an id and a name
    if (!(org?.id && org.name)) {
      return null;
    }

    const image = org.image ?? null;
    let href = null;
    if (org.includeLink && org.link?.href) {
      if (org.link.linkType === "custom") {
        // link.href manually set to external url
        ({ href } = org.link);
      } else {
        // linkType == internal: link.href points to org parent page via beforeValidate hook
        href = `${org.link.href}/${org.slug}`;
      }
    }
    const link = href ? { href } : null;
    return {
      id: org.id,
      name: org.name,
      description: org.description ?? null,
      image,
      link,
      buttonLabel: buttonLabel || "Learn More",
    };
  };
}

function getParticipatingOrganizationListBlock(block) {
  const {
    title,
    subtitle = null,
    variant,
    organizations: orgs,
    buttonLabel,
    ...rest
  } = block;

  const organizations =
    orgs?.map(propsifyOrg(buttonLabel)).filter(Boolean) ?? [];

  return {
    ...rest,
    slug: "participating-organization-list",
    title,
    subtitle,
    variant,
    organizations,
  };
}

export default getParticipatingOrganizationListBlock;
