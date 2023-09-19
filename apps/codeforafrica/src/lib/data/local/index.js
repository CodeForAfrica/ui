import { getPageProps } from "@/codeforafrica/lib/data/common";
import api from "@/codeforafrica/lib/payload";

export async function getPageServerSideProps(context) {
  const props = await getPageProps(api, context);

  return {
    props,
  };
}

export default { getPageServerSideProps };
