import React from "react";
import PropTypes from "prop-types";

import { ApolloProvider } from "@apollo/client";

import { DefaultSeo } from "next-seo";

import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import theme from "@/promisetracker/theme/index";
import SEO from "next-seo.config";
import createApolloClient from "@/promisetracker/lib/createApolloClient";

import "simplebar/dist/simplebar.css";

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const apolloClient = createApolloClient();
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <DefaultSeo {...SEO} />
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({}).isRequired,
};
