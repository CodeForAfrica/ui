import Error from "@/charterafrica/components/Error";
import { getPageStaticProps } from "@/charterafrica/lib/data/rest";

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

CustomError.getInitialProps = async ({ res = {}, locale, defaultLocale }) => {
  const { statusCode } = res;
  const data = await getPageStaticProps({
    locale,
    defaultLocale,
    query: { slug: "error", statusCode },
  });

  return data.props;
};
