import * as Sentry from "@sentry/nextjs";
import NextError from "next/error";

import ErrorPage from "@/trustlab/components/Error";
import { getPageStaticProps } from "@/trustlab/lib/data";

function CustomErrorComponent(props) {
  const { blocks, statusCode = 500 } = props;
  if (!blocks || blocks.length === 0) {
    return <NextError statusCode={statusCode} />;
  }

  return blocks?.map((block) => {
    switch (block?.slug) {
      case "error":
        return <ErrorPage key={block.slug} {...block} />;
      default:
        return <NextError statusCode={statusCode} />;
    }
  });
}

export async function getStaticProps(context) {
  try {
    await Sentry.captureUnderscoreErrorException(context);
    const { props } = await getPageStaticProps({
      ...context,
      params: { slugs: ["404"] },
    });
    return { props };
  } catch (error) {
    Sentry.captureException(error);
    return { props: { error: "Failed to load error page" } };
  }
}

export default CustomErrorComponent;
