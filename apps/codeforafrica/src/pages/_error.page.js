import ErrorPage from "@/codeforafrica/components/ErrorPage";
import { getPageStaticProps } from "@/codeforafrica/lib/data/rest";

function CustomError(props) {
  return <ErrorPage {...props} />;
}

export async function getStaticProps(context) {
  return getPageStaticProps(context, "/_error");
}

export default CustomError;
