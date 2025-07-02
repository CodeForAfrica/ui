import { getHelpline } from "@/trustlab/utils/helplines";

export default async function helplines(api, context) {
  const { params } = context;
  const slug = params.slugs[1];

  return getHelpline(api, slug);
}
