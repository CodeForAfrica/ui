import React, { ReactNode } from "react";

import type { AppProps } from "next/app";
import Head from "next/head";
import theme from "@/robots-generator/theme";
import createEmotionCache from "@/robots-generator/utils/createEmotionCache";
import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Page from "@/robots-generator/components/Page";

const clientSideEmotionCache = createEmotionCache();

function getDefaultLayout(page: ReactNode, pageProps: any) {
  return <Page {...pageProps}>{page}</Page>;
}

export default function App(props: AppProps | any) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout || getDefaultLayout;

  return (
    <>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {getLayout(<Component {...pageProps} />, pageProps)}
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}
