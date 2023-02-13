import Error from "@/charterafrica/components/Error";
import {
  fetchGlobalProps,
  fetchPage,
} from "@/charterafrica/lib/data/fetchData";

export default function CustomError({ blocks }) {
  return blocks?.map((block) => {
    switch (block?.slug) {
      case "404":
        return <Error key={block.slug} {...block} />;
      default:
        return null;
    }
  });
}
// TODO find a way to deal with other status codes
// Status code is only accessible on getStaticProps but does not work with payload
export async function getStaticProps(args) {
  const { footer, navbar } = await fetchGlobalProps(args);

  const { docs } = await fetchPage("404");
  const [{ blocks: pages, slug }] = docs;
  const setData = pages.find(({ statusCode }) => statusCode === 404);
  const notFoundBlock = {
    slug,
    action: {},
    ...setData,
  };

  const blocks = [notFoundBlock];
  return { props: { blocks, footer, navbar } };
}
