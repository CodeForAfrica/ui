import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { DefaultSeo } from "next-seo";
import PropTypes from "prop-types";
import React from "react";

import SEO from "@/charterafrica/next-seo.config";
import "@/charterafrica/theme/fonts.css";
import theme from "@/charterafrica/theme";
import createEmotionCache from "@/charterafrica/utils/createEmotionCache";

const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <>
      <DefaultSeo {...SEO} />
      <CacheProvider value={emotionCache}>
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
