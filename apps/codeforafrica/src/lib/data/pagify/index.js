import partners from "./partners";

const pagifyBySlug = {
  partners,
};

async function pagify(pageSlug, api, context) {
  const pagifySlug = pagifyBySlug[pageSlug];
  return pagifySlug(api, context);
}

export default pagify;
