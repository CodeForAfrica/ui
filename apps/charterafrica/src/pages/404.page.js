import ErrorPage from "@/charterafrica/components/ErrorPage";
import { getPageStaticProps } from "@/charterafrica/lib/data/rest";

export async function getStaticProps(context) {
  const data = await getPageStaticProps({
    ...context,
    slug: "404",
    resolvedUrl: "/404",
  });

  return data;
}

export default ErrorPage;
