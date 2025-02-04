/* eslint-env browser */
import { CssBaseline } from "@mui/material";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SessionProvider } from "next-auth/react";
import { DefaultSeo } from "next-seo";
import PropTypes from "prop-types";
import React from "react";

import SEO from "@/promisetracker/next-seo.config";
import theme from "@/promisetracker/theme/index";

// simplebar-react has a hard dependency on simplebar

import "simplebar-react/dist/simplebar.min.css";

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const gaID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <DefaultSeo {...SEO} />
      <SessionProvider session={pageProps.session}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </StyledEngineProvider>
      </SessionProvider>
      <GoogleAnalytics gaId={gaID} />
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({
    session: PropTypes.shape({}),
  }).isRequired,
};
