import { createEmotionCache } from "@/commons-ui/core/styles";
import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import React from "react";

import Page from "@/trustlab/components/Page";
import SEO from "@/trustlab/next-seo.config";
import theme from "@/trustlab/theme";

function getDefaultLayout(page, pageProps) {
  return <Page {...pageProps}>{page}</Page>;
}
const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout || getDefaultLayout;

  return (
    <>
      <DefaultSeo {...SEO} />
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          {getLayout(<Component {...pageProps} />, pageProps)}
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}

export default MyApp;
