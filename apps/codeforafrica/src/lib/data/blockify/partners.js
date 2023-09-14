function processSinglePartner() {}

function partners(block, api, context) {
  const { params } = context;
  processSinglePartner(params);
  return block;
}

export default partners;
