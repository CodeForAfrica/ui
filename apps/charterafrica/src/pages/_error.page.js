import ErrorPage from "@/charterafrica/components/ErrorPage";
import { fetchErrorPages, fetchGlobalProps } from "@/charterafrica/lib/data";

export default function CustomError({ blocks }) {
  return blocks?.map((block) => {
    switch (block?.slug) {
      case "page-not-found":
        return <ErrorPage key={block.slug} {...block} />;
      default:
        return null;
    }
  });
}

// TODO find a way to deal with other status codes
// Status code is only accessible on getStaticProps but does not work with payload
export async function getStaticProps(args) {
  const { footer, navbar } = await fetchGlobalProps(args);
  const { docs } = await fetchErrorPages(args);
  const setData = docs.find(({ statusCode }) => statusCode === 500);
  const notFoundBlock = {
    slug: "page-not-found",
    ...setData,
  };

  const blocks = [notFoundBlock];
  return { props: { blocks, footer, navbar } };
}
