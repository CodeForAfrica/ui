import Head from "next/head";
import { DefaultSeo } from "next-seo";
import React from "react";

import Page from "@/trustlab/components/Page";
import SEO from "@/trustlab/next-seo.config";

function getDefaultLayout(page, pageProps) {
  return <Page {...pageProps}>{page}</Page>;
}

function MyApp(props) {
  const { Component, pageProps } = props;

  const getLayout = Component.getLayout || getDefaultLayout;

  return (
    <>
      <DefaultSeo {...SEO} />
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      {getLayout(<Component {...pageProps} />, pageProps)}
    </>
  );
}

export default MyApp;
