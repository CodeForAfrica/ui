import Error from "@/climatemappedafrica/components/Error";
import { getPageStaticProps } from "@/climatemappedafrica/lib/data";

function ServerErrorPage({ blocks = [] }) {
  return blocks?.map((block) => {
    switch (block?.slug) {
      case "error":
        return <Error key={block.slug} {...block} />;
      default:
        return null;
    }
  });
}

export async function getStaticProps(context) {
  const data = getPageStaticProps({
    ...context,
    params: { slugs: ["500"] },
  });
  // Unlikely to get 404 from within a 500 page, but just in case
  // e.g. When the CMS is configured but no pages exist yet
  if (data?.notFound) {
    return {
      props: {
        blocks: [
          {
            slug: "error",
            title: "Server Error",
            statusCode: 500,
          },
        ],
      },
    };
  }
  return data;
}

export default ServerErrorPage;
