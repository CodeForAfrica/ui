import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { deepmerge } from "@mui/utils";
import { GoogleAnalytics } from "@next/third-parties/google";
import App from "next/app";
import { DefaultSeo } from "next-seo";
import PropTypes from "prop-types";
import React from "react";

import Layout from "@/charterafrica/components/Layout";
import SEO from "@/charterafrica/next-seo.config";
import "@/charterafrica/theme/fonts.css";
import theme from "@/charterafrica/theme";
import createEmotionCache from "@/charterafrica/utils/createEmotionCache";

const clientSideEmotionCache = createEmotionCache();

function getDefaultLayout(page, pageProps) {
  return <Layout {...pageProps}>{page}</Layout>;
}

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const { analytics } = pageProps;
  const { analyticsId: gaId } = analytics || {};
  const getLayout = Component.getLayout || getDefaultLayout;

  return (
    <>
      <DefaultSeo {...SEO} />
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {getLayout(<Component {...pageProps} />, pageProps)}
        </ThemeProvider>
      </CacheProvider>
      <GoogleAnalytics gaId={gaId} />
    </>
  );
}

MyApp.getInitialProps = async (appContext) => {
  // https://nextjs.org/docs/advanced-features/custom-app#caveats
  const appProps = await App.getInitialProps(appContext);
  const {
    Component,
    router: { defaultLocale, locale, locales },
    ctx: appCtx,
  } = appContext;
  let pageProps = {};
  if (Component.getInitialProps) {
    const ctx = { ...appCtx, defaultLocale, locale, locales };
    pageProps = await Component.getInitialProps(ctx);
  }
  return deepmerge(appProps, { pageProps }, { clone: false });
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.shape({}),
  pageProps: PropTypes.shape({}).isRequired,
};

MyApp.defaultProps = {
  emotionCache: undefined,
};

export default MyApp;
