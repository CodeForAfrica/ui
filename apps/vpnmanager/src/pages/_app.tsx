import { CacheProvider } from "@emotion/react";
import { SessionProvider } from "next-auth/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppProps } from "next/app";
import Head from "next/head";
import React, { ReactNode } from "react";

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

  return (
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
  );
}

export default MyApp;
