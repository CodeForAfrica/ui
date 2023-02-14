import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useRouter } from "next/router";
import Script from "next/script";
import { DefaultSeo } from "next-seo";
import PropTypes from "prop-types";
import React, { useEffect } from "react";

import Layout from "@/charterafrica/components/Layout";
import * as gtag from "@/charterafrica/lib/gtag";
import SEO from "@/charterafrica/next-seo.config";
import "@/charterafrica/theme/fonts.css";
import theme from "@/charterafrica/theme";
import createEmotionCache from "@/charterafrica/utils/createEmotionCache";

const clientSideEmotionCache = createEmotionCache();

function getDefaultLayout(page, pageProps) {
  return <Layout {...pageProps}>{page}</Layout>;
}

function MyApp(props) {
  const router = useRouter();
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout || getDefaultLayout;
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_MEASUREMENT_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${gtag.GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <DefaultSeo {...SEO} />
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {getLayout(<Component {...pageProps} />, pageProps)}
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}

MyApp.getInitialProps = async ({ Component, router, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return {
    pageProps,
    ...router,
  };
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
