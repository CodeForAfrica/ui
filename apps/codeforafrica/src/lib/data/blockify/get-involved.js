import formatImpacts from "@/codeforafrica/lib/data/utils/impacts";

function getInvolved(block) {
  const { impacts, ...other } = block;
  const ourImpacts = formatImpacts(impacts);

  return {
    ...other,
    impacts: ourImpacts,
    slug: "get-involved",
  };
}

export default getInvolved;
