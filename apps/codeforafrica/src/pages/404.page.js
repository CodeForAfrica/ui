import ErrorPage from "@/codeforafrica/components/ErrorPage";
import { getPageStaticProps } from "@/codeforafrica/lib/data/rest";

function NotFound(props) {
  return <ErrorPage {...props} />;
}

export async function getStaticProps(context) {
  return getPageStaticProps({
    ...context,
    params: { slugs: ["404"] },
  });
}

export default NotFound;
