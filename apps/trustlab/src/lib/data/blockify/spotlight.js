async function spotlight(block) {
  const { relationship, ...other } = block;

  return {
    ...other,
    relationship: relationship.map((r) => r.value),
    slug: "spotlight",
  };
}

export default spotlight;
