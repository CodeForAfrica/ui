
import React from "react";
import App from "next/app";
import Head from "next/head";

import '../assets/css/App.css';
import Theme from '../Theme'

import { MuiThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';


export default class PromiseTrackerApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  renderHead() {
    return (
      <Head>
      <title>Promise Tracker</title>
      </Head>
    );
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <MuiThemeProvider theme={Theme}>
          {this.renderHead()}
          <CssBaseline />
          <Component {...pageProps} />
      </MuiThemeProvider>
    );
  }
}
