import { getResource } from "@/trustlab/utils/resources";

export default async function resources(api, context) {
  const { params } = context;
  const slug = params.slugs[1];

  return getResource(api, slug);
}
