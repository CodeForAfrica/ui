function jsonQL(factChecks) {
  const allFactChecks = factChecks.map((fc) => {
    const href = fc.href || fc.link;

    return { ...fc, href };
  });

  const api = {
    getFactChecks({ limit } = {}) {
      return allFactChecks.slice(0, limit);
    },
  };

  return api;
}

export default jsonQL;
