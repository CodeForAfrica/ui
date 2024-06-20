import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import Head from "next/head";
import React, { ReactNode } from "react";

import Page from "@/roboshield/components/Page";
import { GlobalProvider } from "@/roboshield/context/GlobalContext";
import theme from "@/roboshield/theme";
import createEmotionCache from "@/roboshield/utils/createEmotionCache";
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
          <title>RobotShield</title>
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
