export async function getReports(api, options) {
  const { docs, totalPages, page } = await api.getCollection("reports", {
    ...options,
  });

  const reports = docs.map((doc) => ({
    ...doc,
    date: new Date(doc.date).toISOString().split("T")[0],
  }));
  return {
    reports,
    pagination: {
      count: totalPages,
      page,
    },
  };
}

export async function getReport(api, slug) {
  const { docs } = await api.getCollection("reports", {
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  });

  const { docs: pages } = await api.getCollection("pages", {
    where: {
      slug: {
        equals: "research",
      },
    },
  });
  const parentPageBlocks = pages[0]?.blocks || [];
  const actionBannerBlock = parentPageBlocks.find(
    (block) => block.blockType === "action-banner",
  );
  const researchCategoryBlock = parentPageBlocks.find(
    (block) => block.blockType === "research-category",
  );
  const settings = researchCategoryBlock?.settings ?? {};
  const extraBlocks = actionBannerBlock ? [actionBannerBlock] : [];
  const [report] = docs;
  if (report) {
    return {
      ...report,
      blocks: [
        {
          blockType: "page-header",
          backButton: {
            label: settings.backButtonLabel ?? "Back to Reports",
            href: "/research",
          },
          title: report.title,
          backgroundColor: "#010101",
          textColor: "#FFFFFF",
          id: report.id,
        },
        {
          blockType: "page-overview",
          content: report.overview || null,
          title: settings.overViewLabel || "Overview",
          image: report.image || null,
          textAlign: "left",
          backgroundColor: "#FFFFFF",
          textColor: "#000000",
          id: `${report.id}-overview`,
          isReport: true,
          downLoadLink: {
            href: report?.file?.url || null,
            label: settings?.downloadLabel ?? "Download Report",
          },
        },
        ...extraBlocks,
      ],
      date: new Date(report.date).toISOString().split("T")[0],
    };
  }
  return null;
}
