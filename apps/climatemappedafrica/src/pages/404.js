import Error from "@/climatemappedafrica/components/Error";
import { getPageStaticProps } from "@/climatemappedafrica/lib/data";

function NotFound({ blocks = [] }) {
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
    params: { slugs: ["404"] },
  });
}

export default NotFound;
