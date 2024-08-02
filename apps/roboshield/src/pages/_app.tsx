import { CssBaseline, ThemeProvider } from "@mui/material";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ReactNode } from "react";

import Page from "@/roboshield/components/Page";
import { GlobalProvider } from "@/roboshield/context/GlobalContext";
import theme from "@/roboshield/theme";
import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";

function getDefaultLayout(page: ReactNode, pageProps: any) {
  return <Page {...pageProps}>{page}</Page>;
}

export default function App(props: AppProps | any) {
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout || getDefaultLayout;
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

  return (
    <>
      <AppCacheProvider {...props}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <title>RoboShield</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalProvider>
            {getLayout(<Component {...pageProps} />, pageProps)}
          </GlobalProvider>
        </ThemeProvider>
      </AppCacheProvider>
      {gaId?.length ? <GoogleAnalytics gaId={gaId} /> : null}
    </>
  );
}
