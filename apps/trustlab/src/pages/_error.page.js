import * as Sentry from "@sentry/nextjs";
import NextError from "next/error";

import ErrorPage from "@/trustlab/components/Error";
import { getPageStaticProps } from "@/trustlab/lib/data";

function CustomErrorComponent(props) {
  const { blocks, statusCode = 500 } = props;
  if (!blocks || blocks.length === 0) {
    return <NextError statusCode={statusCode} />;
  }

  const errorBlock = blocks.find((block) => block?.slug === "error");
  if (!errorBlock) {
    return <NextError statusCode={statusCode} />;
  }
  return <ErrorPage {...errorBlock} />;
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
