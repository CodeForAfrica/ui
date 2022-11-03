import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { DefaultSeo } from "next-seo";
import Head from "next/head";
import PropTypes from "prop-types";
import React from "react";

import SEO from "@/codeforafrica/next-seo.config";
import "@/codeforafrica/theme/fonts.css";
import theme from "@/codeforafrica/theme";
import createEmotionCache from "@/codeforafrica/utils/createEmotionCache";

const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <>
      <DefaultSeo {...SEO} />
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
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
