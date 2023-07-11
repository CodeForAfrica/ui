import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Head from "next/head";
import Script from "next/script";
import { DefaultSeo } from "next-seo";
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
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
      />
      <Script id="gtag-init" strategy="lazyOnload">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments)}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', {
          page_path: window.location.pathname,
        });
      `}
      </Script>

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
