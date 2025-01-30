/* eslint-env browser */
import { CssBaseline } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";
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
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({
    session: PropTypes.shape({}),
  }).isRequired,
};
