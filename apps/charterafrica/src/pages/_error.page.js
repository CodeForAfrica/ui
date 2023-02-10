import ErrorPage from "@/charterafrica/components/ErrorPage";
import { payload } from "@/charterafrica/lib";
import { getGlobalProps } from "@/charterafrica/lib/data";

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
export async function getServerSideProps({ defaultLocale, locale, locales }) {
  const { footer, navbar } = await getGlobalProps({
    defaultLocale,
    locale,
    locales,
  });
  const { docs } = await payload.getCollection("errors", {
    where: { statusCode: 500 },
  });

  const setData = docs.find(({ statusCode }) => statusCode === 500);
  const notFoundBlock = {
    slug: "page-not-found",
    title: "INTERNAL SERVER ERROR",
    statusCode: 500,
    description: [
      {
        children: [
          {
            text: "There seems to be an error on this page. Please contact us for more details",
          },
        ],
      },
    ],
    ...setData,
  };

  const blocks = [notFoundBlock];
  return { props: { blocks, footer, navbar } };
}
