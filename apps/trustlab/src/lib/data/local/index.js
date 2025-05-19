import { getPageProps } from "@/trustlab/lib/data/common";
import api from "@/trustlab/lib/payload";

export async function getPageServerSideProps(context) {
  const props = await getPageProps(api, context);
  if (!props) {
    return { notFound: true };
  }

  return {
    props,
  };
}

export default { getPageServerSideProps };
