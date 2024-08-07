import { CssBaseline } from "@mui/material";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { ThemeProvider as StyledThemeProvider } from "@mui/styles";
import { useRouter } from "next/router";
import { DefaultSeo } from "next-seo";
import PropTypes from "prop-types";
import React from "react";

import * as ga from "@/climatemappedafrica/lib/ga";
import "@/climatemappedafrica/theme/fonts.css";
import SEO from "@/climatemappedafrica/next-seo.config";
import theme from "@/climatemappedafrica/theme";

export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    /* eslint-env browser */
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const router = useRouter();

  React.useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };
    // When the component is mounted, subscribe to router changes
    // and log those page views
    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <DefaultSeo {...SEO} />
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <StyledThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </StyledThemeProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({}).isRequired,
};
