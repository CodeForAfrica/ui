import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { DefaultSeo } from "next-seo";
import PropTypes from "prop-types";
import React, { useEffect } from "react";

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
  const router = useRouter();
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout || getDefaultLayout;
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID) {
      const handleRouteChange = (url) => {
        /* eslint-env browser */
        window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID, {
          page_path: url,
        });
      };
      router.events.on("routeChangeComplete", handleRouteChange);

      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    }
    return undefined;
  }, [router.events]);

  return (
    <>
      <DefaultSeo {...SEO} />
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments)}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
          `,
            }}
          />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {getLayout(<Component {...pageProps} />, pageProps)}
        </ThemeProvider>
      </CacheProvider>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
      />
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
