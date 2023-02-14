import Error from "@/charterafrica/components/Error";
import {
  fetchGlobalProps,
  fetchPage,
} from "@/charterafrica/lib/data/fetchData";

export default function CustomError({ blocks }) {
  return blocks?.map((block) => {
    switch (block?.slug) {
      case "error":
        return <Error key={block.slug} {...block} />;
      default:
        return null;
    }
  });
}
// TODO find a way to deal with other status codes
// Status code is only accessible on getStaticProps but does not work with payload
export async function getStaticProps(args) {
  const { docs } = await fetchPage("error", args);
  if (!docs.length) {
    return { notFound: true };
  }
  const [{ blocks: pages, slug }] = docs;
  if (!pages.length) {
    return { notFound: true };
  }
  const setData = pages.find(({ statusCode }) => statusCode === 500);
  const { footer, navbar } = await fetchGlobalProps(args);
  const notFoundBlock = {
    slug,
    link: {},
    ...setData,
  };

  const blocks = [notFoundBlock];
  return { props: { blocks, footer, navbar } };
}
