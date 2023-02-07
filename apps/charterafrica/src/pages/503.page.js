import ErrorPage from "@/charterafrica/components/ErrorPage";
import { payload } from "@/charterafrica/lib";
import { getGlobalProps } from "@/charterafrica/lib/data";

export default function CustomError({ blocks }) {
  return blocks?.map((block) => {
    switch (block?.slug) {
      case "internal-server-error":
        return <ErrorPage key={block.slug} {...block} />;
      default:
        return null;
    }
  });
}

export async function getStaticProps({ defaultLocale, locale, locales }) {
  const { footer, navbar } = await getGlobalProps({
    defaultLocale,
    locale,
    locales,
  });
  const statusCode = 503;
  const { docs } = await payload.getCollection("errors", {
    where: { statusCode },
  });

  const setData = docs.find((doc) => doc.statusCode === statusCode);
  const notFoundBlock = {
    slug: "internal-server-error",
    title: "SERVER TOO BUSY",
    statusCode,
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
