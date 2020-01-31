import React from 'react';
import App from 'next/app';

import 'assets/css/App.css';
import theme from 'theme';

import { MuiThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

import NextSeo from 'next-seo';

const SEO_METATAGS = {
  title: 'Promise Tracker App',
  description: '',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: '',
    title: 'Promise tracker',
    description: '',
    image: '',
    site_name: 'promise-tracker',
    imageWidth: 1200,
    imageHeight: 1200
  },
  twitter: {
    handle: '',
    cardType: ''
  },
  facebook: {
    handle: '',
    cardType: ''
  }
};

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
          <NextSeo config={SEO_METATAGS} />
          <Component {...pageProps} />
        </MuiThemeProvider>
      </>
    );
  }
}

export default PromiseTrackerApp;
