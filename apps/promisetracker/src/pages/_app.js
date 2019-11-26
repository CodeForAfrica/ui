import React from 'react';
import App from 'next/app';

import 'assets/css/App.css';

import { MuiThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from 'theme';

import withApollo from 'lib/withApollo';
import { ApolloProvider } from 'react-apollo';

class PromiseTrackerApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { PageComponent, pageProps, apolloClient } = this.props;
    return (
      <>
        <MuiThemeProvider theme={theme}>
          <ApolloProvider client={apolloClient}>
            <CssBaseline />
            <PageComponent {...pageProps} />
          </ApolloProvider>
        </MuiThemeProvider>
      </>
    );
  }
}

export default withApollo(PromiseTrackerApp);
