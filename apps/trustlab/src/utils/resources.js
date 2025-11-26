export async function getPlaybooks(api, options) {
  const { docs, totalPages, page } = await api.getCollection("playbooks", {
    ...options,
  });

  const playbooks = docs.map((doc) => {
    return {
      ...doc,
      link: {
        href: doc.pdf?.src || "",
        ...doc.pdf,
      },
    };
  });
  return {
    playbooks,
    pagination: {
      count: totalPages,
      page,
    },
  };
}

export async function getToolkits(api, options) {
  const {
    docs: toolkits,
    totalPages,
    page,
  } = await api.getCollection("toolkits", {
    ...options,
  });

  return {
    toolkits,
    pagination: {
      count: totalPages,
      page,
    },
  };
}
