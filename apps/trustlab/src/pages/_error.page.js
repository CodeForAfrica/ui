import * as Sentry from "@sentry/nextjs";
import NextError from "next/error";

import ErrorPage from "@/trustlab/components/Error";
import { getErrorPageProps } from "@/trustlab/lib/data/rest";

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

CustomErrorComponent.getInitialProps = async (context) => {
  try {
    await Sentry.captureUnderscoreErrorException(context);
    const { props } = await getErrorPageProps({
      ...context,
      params: { slugs: ["500"] },
    });

    return props;
  } catch (error) {
    Sentry.captureException(error);
    return { error: "Failed to load error page" };
  }
};

export default CustomErrorComponent;
