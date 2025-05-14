import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { GoogleAnalytics } from "@next/third-parties/google";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import PropTypes from "prop-types";
import React from "react";

import Page from "@/codeforafrica/components/Page";
import SEO from "@/codeforafrica/next-seo.config";
import "@/codeforafrica/theme/fonts.css";
import theme from "@/codeforafrica/theme";
import createEmotionCache from "@/codeforafrica/utils/createEmotionCache";

const clientSideEmotionCache = createEmotionCache();

function getDefaultLayout(page, pageProps) {
  return <Page {...pageProps}>{page}</Page>;
}

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const { analytics } = pageProps;
  const { analyticsId: gaId } = analytics || {};

  const getLayout = Component.getLayout || getDefaultLayout;
  console.log("pageProps", pageProps);

  return (
    <>
      <DefaultSeo {...SEO} />
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {getLayout(<Component {...pageProps} />, pageProps)}
        </ThemeProvider>
      </CacheProvider>
      <GoogleAnalytics gaId={gaId} />
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.shape({}),
  pageProps: PropTypes.shape({}).isRequired,
};

MyApp.defaultProps = {
  emotionCache: undefined,
};

export default MyApp;
