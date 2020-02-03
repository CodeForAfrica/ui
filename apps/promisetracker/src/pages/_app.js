import React from 'react';
import App from 'next/app';

import 'assets/css/App.css';
import theme from 'theme';

import { MuiThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

import NextSeo from 'next-seo';
import SEO from '../next-seo.config';

class PromiseTrackerApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <NextSeo config={SEO} />
          <Component {...pageProps} />
        </MuiThemeProvider>
      </>
    );
  }
}

export default PromiseTrackerApp;
