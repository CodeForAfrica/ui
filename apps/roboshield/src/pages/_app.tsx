import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { AppProps } from "next/app";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import { ReactNode } from "react";

import Page from "@/roboshield/components/Page";
import { GlobalProvider } from "@/roboshield/context/GlobalContext";
import SEO from "@/roboshield/next-seo.config";
import theme from "@/roboshield/theme";

function getDefaultLayout(page: ReactNode, pageProps: any) {
  return <Page {...pageProps}>{page}</Page>;
}

export default function App(props: AppProps | any) {
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout || getDefaultLayout;
  const { analytics } = pageProps;
  const { analyticsId: gaId } = analytics || {};

  return (
    <>
      <DefaultSeo {...SEO} />
      <AppCacheProvider {...props}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalProvider>
            {getLayout(<Component {...pageProps} />, pageProps)}
          </GlobalProvider>
        </ThemeProvider>
      </AppCacheProvider>
      <GoogleAnalytics gaId={gaId} />
    </>
  );
}
