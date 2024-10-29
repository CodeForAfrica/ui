async function tutorial({ hurumap }) {
  const {
    panel: { steps },
    enabled,
  } = hurumap;

  const items = steps.map((step) => ({
    ...step,
    selector: `#${step.selector}`,
  }));
  return {
    blockType: "tutorial",
    id: "tutorial",
    enabled,
    items,
  };
}

export default tutorial;
