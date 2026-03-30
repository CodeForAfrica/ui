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
  const resolvedOrganizations = await Promise.all(
    (organizations || []).map(async (org) => {
      // Handle both populated and unpopulated relationships
      const orgData = typeof org === "object" ? org : null;

      if (!orgData) {
        return null;
      }

      const image = orgData.image ?? null;

      // For card variant, generate link from breadcrumbs/slug
      const link =
        (variant === "card"
          ? {
              href: `/${pagePath}/${orgData.slug}`,
            }
          : {
              href: orgData?.link?.href ?? null,
            }) ?? null;

      return {
        id: orgData.id,
        name: orgData.name,
        description: orgData.description ?? null,
        image,
        link,
        buttonLabel: buttonLabel || "Learn More",
      };
    }),
  );

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
