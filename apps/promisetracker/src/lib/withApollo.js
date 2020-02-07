/* eslint-disable no-console */
import React from 'react';

import Head from 'next/head';

import { getDataFromTree } from '@apollo/react-ssr';
import { ApolloProvider } from '@apollo/react-hooks';

import useClient from './useClient';

let reusableApolloClient = null;

export function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return useClient(initialState);
  }

  // Reuse client on the client-side
  if (!reusableApolloClient) {
    reusableApolloClient = useClient(initialState);
  }

  return reusableApolloClient;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

const withApollo = PageComponent => {
  return class extends React.Component {
    static get displayName() {
      return `withApollo(${getDisplayName(PageComponent)})`;
    }

    static async getInitialProps(ctx) {
      const { AppTree } = ctx;
      const apolloClient = initApollo();
      ctx.apolloClient = apolloClient;

      let pageProps = {};
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx);
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      if (typeof window === 'undefined') {
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <AppTree
              pageProps={{
                ...pageProps,
                apolloClient
              }}
            />
          );
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          console.error('Error while running `getDataFromTree`', error);
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract();

      return {
        ...pageProps,
        apolloState
      };
    }

    constructor(props) {
      super(props);
      this.apolloClient = props.apolloClient || initApollo(props.apolloState);
    }

    render() {
      const { apolloClient, apolloState, ...pageProps } = this.props;
      return (
        <ApolloProvider client={this.apolloClient}>
          <PageComponent {...pageProps} />
        </ApolloProvider>
      );
    }
  };
};

export default withApollo;
