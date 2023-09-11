import { getPageProps } from "@/codeforafrica/lib/data/common";
import api from "@/codeforafrica/lib/data/local/payload";

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
