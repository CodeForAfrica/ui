import ErrorPage from "@/charterafrica/components/Error";
import { getPageStaticProps } from "@/charterafrica/lib/data/rest";

export default function CustomError({ blocks }) {
  return blocks?.map((block) => {
    switch (block?.slug) {
      case "error":
        return <ErrorPage key={block.slug} {...block} />;
      default:
        return null;
    }
  });
}

export async function getStaticProps(args) {
  const data = await getPageStaticProps({
    ...args,
    query: { slug: "error", statusCode: 404 },
  });

  return data;
}
