import { getPageStaticProps } from "@/climatemappedafrica/lib/data";

function NotFound() {
  return <h1>Error Page here</h1>;
}

export async function getStaticProps(context) {
  return getPageStaticProps({
    ...context,
    params: { slugs: ["404"] },
  });
}

export default NotFound;
