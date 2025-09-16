import ErrorPage from "@/charterafrica/components/ErrorPage";
import { getPageStaticProps } from "@/charterafrica/lib/data/rest";

export async function getStaticProps(context) {
  const data = await getPageStaticProps({
    ...context,
    params: { slugs: ["404"] },
  });

  // Unlikely to get 404 from within a 404 page, but just in case
  // e.g. When the CMS is configured but no pages exist yet
  if (data?.notFound) {
    return {
      props: {
        blocks: [
          {
            slug: "error",
            title: "Page Not Found",
            statusCode: 404,
          },
        ],
      },
    };
  }
  return data;
}

export default ErrorPage;
