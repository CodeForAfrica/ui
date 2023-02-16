import React from "react";

import ErrorPage from "@/charterafrica/components/ErrorPage";
import { getPageStaticProps } from "@/charterafrica/lib/data/rest";

function CustomError(props) {
  return <ErrorPage {...props} />;
}

CustomError.getInitialProps = async ({
  defaultLocale,
  err,
  locale,
  locales,
  res,
}) => {
  const statusCode = res?.statusCode ?? err?.statusCode;
  // If we don't have a specific error page for the given status code,
  // show generic 500,
  const slug = (
    [404, 500, 503].includes(statusCode) ? statusCode : 500
  ).toString();

  const { props } = await getPageStaticProps({
    defaultLocale,
    locale,
    locales,
    resolvedUrl: `/${slug}`,
    slug,
  });

  return props;
};

export default CustomError;
