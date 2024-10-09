import { payload } from "@/climatemappedafrica/lib";
import { getPageProps } from "@/climatemappedafrica/lib/data/common";

export const api = payload;

export async function getPageServerSideProps(context) {
  const props = await getPageProps(api, context);

  if (!props) {
    return { notFound: true };
  }
  return {
    props,
  };
}
