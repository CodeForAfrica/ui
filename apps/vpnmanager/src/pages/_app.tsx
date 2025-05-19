import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

import Page from "@/vpnmanager/components/Page";
import theme from "@/vpnmanager/theme";
import createEmotionCache from "@/vpnmanager/utils/createEmotionCache";

const clientSideEmotionCache = createEmotionCache();

function getDefaultLayout(page: ReactNode, pageProps: any) {
  return <Page {...pageProps}>{page}</Page>;
}

function MyApp(props: AppProps | any) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout || getDefaultLayout;

  const gaID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || "";

  return (
    <>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <SessionProvider session={pageProps.session}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {getLayout(<Component {...pageProps} />, pageProps)}
          </ThemeProvider>
        </SessionProvider>
      </CacheProvider>
      <GoogleAnalytics gaId={gaID} />
    </>
  );
}

export default MyApp;
