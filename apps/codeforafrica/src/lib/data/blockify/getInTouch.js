function getInTouch(block) {
  const {
    actionButton: { href, label },
    ...other
  } = block;

  return {
    ...other,
    action: {
      href,
      content: label,
    },
    slug: "get-in-touch",
  };
}

export default getInTouch;
