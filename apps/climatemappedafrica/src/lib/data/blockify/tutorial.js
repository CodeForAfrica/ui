async function tutorial({ hurumap }) {
  const { tutorialPanel } = hurumap;
  return {
    blockType: "tutorial",
    id: "tutorial",
    ...tutorialPanel,
  };
}

export default tutorial;
