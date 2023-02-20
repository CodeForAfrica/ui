import ErrorPage from "@/charterafrica/components/ErrorPage";
import { getPageStaticProps } from "@/charterafrica/lib/data/rest";

export async function getStaticProps(context) {
  const data = await getPageStaticProps({
    ...context,
    params: { slug: ["500"] },
  });

  return data;
}

export default ErrorPage;
