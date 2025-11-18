import { getReport } from "@/trustlab/utils/reports";

async function report(api, context) {
  const { params } = context;
  const slug = params.slugs[1];
  return getReport(api, slug);
}

export default report;
