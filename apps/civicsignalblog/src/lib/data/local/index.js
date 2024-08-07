import { getPageProps } from "@/civicsignalblog/lib/data/common";
import api from "@/civicsignalblog/lib/payload";

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
