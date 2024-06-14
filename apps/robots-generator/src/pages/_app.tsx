
import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import Head from "next/head";
import React, { ReactNode } from "react";

import Page from "@/robots-generator/components/Page";
import { GlobalProvider } from "@/robots-generator/context/GlobalContext";
import theme from "@/robots-generator/theme";
import createEmotionCache from "@/robots-generator/utils/createEmotionCache";
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
          <title>Robots Generator</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalProvider>
            {getLayout(<Component {...pageProps} />, pageProps)}
          </GlobalProvider>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}
