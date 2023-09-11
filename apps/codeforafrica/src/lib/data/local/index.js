import { getPageProps } from "@/codeforafrica/lib/data/common";
import { api } from "@/codeforafrica/lib/data/rest";

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
