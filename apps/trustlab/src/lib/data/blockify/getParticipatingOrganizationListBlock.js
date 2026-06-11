function fullSlugFromParents(doc) {
  if (!doc) {
    return "";
  }
  const { slug, parent } = doc;
  if (!parent) {
    return slug;
  }
  return `${fullSlugFromParents(parent)}/${slug}`;
}

async function getParticipatingOrganizationListBlock(block, api) {
  const {
    title,
    subtitle = null,
    variant,
    organizations = [],
    buttonLabel = "Learn More",
    ...rest
  } = block;

  const parentSlug = "organisations";
  const { docs } = await api.findPage(parentSlug, {});
  const doc = docs[0];
  const pagePath = fullSlugFromParents(doc);
  const resolvedOrganizations = (organizations || []).map((org) => {
    if (!org || typeof org !== "object") {
      return null;
    }

    const image = org.image ?? null;

    // For card variant, generate link from breadcrumbs/slug
    const href =
      variant === "card" && org.slug
        ? `/${[pagePath, org.slug].filter(Boolean).join("/")}`
        : org.link?.href;

    return {
      id: org.id,
      name: org.name,
      description: org.description ?? null,
      image,
      link: href ? { href } : null,
      buttonLabel: buttonLabel || "Learn More",
    };
  });

  return {
    ...rest,
    slug: "participating-organization-list",
    title,
    subtitle,
    variant,
    organizations: resolvedOrganizations.filter(Boolean),
  };
}

export default getParticipatingOrganizationListBlock;
