import React from 'react';
import App from 'next/app';
import Head from 'next/head';

import 'assets/css/App.css';

import { MuiThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

import Theme from 'Theme';

export default class PromiseTrackerApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <title>Home - Promise Tracker</title>
        </Head>
        <MuiThemeProvider theme={Theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </MuiThemeProvider>
      </>
    );
  }
}
