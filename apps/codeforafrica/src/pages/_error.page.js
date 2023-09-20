import ErrorPage from "@/codeforafrica/components/ErrorPage";
import { getPageStaticProps } from "@/codeforafrica/lib/data/rest";

function CustomError(props) {
  return <ErrorPage {...props} />;
}

export async function getStaticProps(context) {
  return getPageStaticProps({ ...context, params: { slugs: ["500"] } });
}

export default CustomError;
