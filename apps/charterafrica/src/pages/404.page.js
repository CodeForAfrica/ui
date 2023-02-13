import ErrorPage from "@/charterafrica/components/Error";
import {
  fetchGlobalProps,
  fetchPage,
} from "@/charterafrica/lib/data/fetchData";

export default function CustomError({ blocks }) {
  return blocks?.map((block) => {
    switch (block?.slug) {
      case "404":
        return <ErrorPage key={block.slug} {...block} />;
      default:
        return null;
    }
  });
}
// TODO find a way to deal with other status codes
// Status code is only accessible on getStaticProps but does not work with payload
export async function getStaticProps(args) {
  const { docs } = await fetchPage("404", args);
  if (!docs.length) {
    throw new Error("Not found");
  }
  const [{ blocks: pages, slug }] = docs;
  if (!pages.length) {
    throw new Error("Not found");
  }
  const setData = pages.find(({ statusCode }) => statusCode === 404);
  const notFoundBlock = {
    slug,
    link: {},
    ...setData,
  };

  const blocks = [notFoundBlock];
  const { footer, navbar } = await fetchGlobalProps(args);
  return { props: { blocks, footer, navbar } };
}
