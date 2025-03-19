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
  return getPageStaticProps({
    ...context,
    params: { slugs: ["500"] },
  });
}

export default ServerErrorPage;
