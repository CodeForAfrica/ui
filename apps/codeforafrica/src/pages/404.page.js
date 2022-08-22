import ErrorPage from "@/codeforafrica/components/ErrorPage";
import { getPageStaticProps } from "@/codeforafrica/lib";

function NotFound(props) {
  return <ErrorPage {...props} />;
}

export async function getStaticProps() {
  return getPageStaticProps({ slug: `/404` });
}

export default NotFound;
