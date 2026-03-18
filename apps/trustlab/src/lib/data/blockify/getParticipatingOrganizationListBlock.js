async function getParticipatingOrganizationListBlock(block) {
  const {
    title,
    subtitle = null,
    variant,
    organizations = [],
    buttonLabel = "Learn More",
    ...rest
  } = block;

  //   const parentSlug = "participating-organization-lists";

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
        (variant === "card" ? orgData?.link : orgData.website) ?? null;

      return {
        id: orgData.id,
        name: orgData.name,
        description: orgData.description,
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
