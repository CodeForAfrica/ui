import formatImpacts from "@/codeforafrica/lib/data/utils/impacts";

function ourImpact(block) {
  const { impacts, ...other } = block;
  const ourImpacts = formatImpacts(impacts);

  return {
    ...other,
    impacts: ourImpacts,
    slug: "our-impact",
  };
}

export default ourImpact;
