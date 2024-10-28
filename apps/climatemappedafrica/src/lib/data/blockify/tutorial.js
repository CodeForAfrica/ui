async function tutorial({ hurumap }) {
  const {
    tutorialPanel: { steps },
    enableTutorial,
  } = hurumap;

  const items = steps.map((step) => ({
    ...step,
    selector: `#${step.selector}`,
  }));
  return {
    blockType: "tutorial",
    id: "tutorial",
    enableTutorial,
    items,
  };
}

export default tutorial;
