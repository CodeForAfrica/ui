import ErrorPage from "@/codeforafrica/components/ErrorPage";
import { getPageStaticProps } from "@/codeforafrica/lib";

function CustomError(props) {
  return <ErrorPage {...props} />;
}

export async function getStaticProps() {
  return getPageStaticProps({ slug: `/_error` });
}

export default CustomError;
