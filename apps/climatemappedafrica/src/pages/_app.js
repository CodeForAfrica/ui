import ProgressBar from "@badrap/bar-of-progress";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { GoogleAnalytics } from "@next/third-parties/google";
import { useRouter } from "next/router";
import { DefaultSeo } from "next-seo";
import PropTypes from "prop-types";
import React from "react";

import Layout from "@/climatemappedafrica/components/Layout";
import "@/climatemappedafrica/theme/fonts.css";
import SEO from "@/climatemappedafrica/next-seo.config";
import theme from "@/climatemappedafrica/theme";

function getDefaultLayout(page, pageProps) {
  return <Layout {...pageProps}>{page}</Layout>;
}
const progress = new ProgressBar({
  size: 4,
  color: "#0B2AEA",
  className: "bar-of-progress",
  delay: 100,
});

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const router = useRouter();

  const { analytics } = pageProps;
  const { analyticsId: gaId } = analytics || {};

  const getLayout = Component.getLayout || getDefaultLayout;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    /* eslint-env browser */
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  React.useEffect(() => {
    const handleStart = () => {
      progress.start();
    };

    const handleComplete = () => {
      progress.finish();
      setTimeout(() => {
        progress.finish();
      }, 100);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <>
      <DefaultSeo {...SEO} />
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {getLayout(<Component {...pageProps} />, pageProps)}
        </ThemeProvider>
      </StyledEngineProvider>
      <GoogleAnalytics gaId={gaId} />
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({}).isRequired,
};
