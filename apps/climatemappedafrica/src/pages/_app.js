import { CssBaseline } from "@mui/material";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { ThemeProvider as StyledThemeProvider } from "@mui/styles";
import { GoogleAnalytics } from "@next/third-parties/google";
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

export default function MyApp(props) {
  const { Component, pageProps } = props;

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

  return (
    <>
      <DefaultSeo {...SEO} />
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <StyledThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {getLayout(<Component {...pageProps} />, pageProps)}
          </StyledThemeProvider>
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
