import { makeStyles } from "@material-ui/core/styles";
import { getProviders, getSession } from "next-auth/react";
import PropTypes from "prop-types";
import React from "react";

import Login from "@/promisetracker/components/LoginPage";
import Page from "@/promisetracker/components/Page";
import backendFn from "@/promisetracker/lib/backend";
import i18n from "@/promisetracker/lib/i18n";
import wp from "@/promisetracker/lib/wp";

const useStyles = makeStyles(({ breakpoints, typography, widths }) => ({
  section: {
    padding: `0 ${typography.pxToRem(23)}`,
    margin: 0,
    width: "100%",
    [breakpoints.up("lg")]: {
      padding: 0,
      margin: "0 auto",
      width: typography.pxToRem(widths.values.lg),
    },
  },
  footer: {
    marginTop: 0,
  },
}));

function SignIn({ providers: providersProp, ...props }) {
  const classes = useStyles(props);

  return (
    <Page
      {...props}
      classes={{ section: classes.section, footer: classes.footer }}
    >
      <Login
        classes={{ section: classes.section }}
        providers={providersProp}
        {...props}
      />
    </Page>
  );
}

SignIn.propTypes = {
  providers: PropTypes.shape({}),
};

SignIn.defaultProps = {
  providers: undefined,
};

/**
 *  NOTE: [getProviders()](https://next-auth.js.org/v3/getting-started/client#getproviders)
 *                   calls /api/providers, which is not available during build
 *                   time and hence we can't use it here.
 */
export async function getServerSideProps({ locale, ...context }) {
  const _ = i18n();
  // Skip generating pages for unsupported locales
  if (!_.locales.includes(locale)) {
    return {
      notFound: true,
    };
  }
  const wpApi = wp();
  const page = await wpApi.pages({ slug: "index", locale }).first;

  const providers = await getProviders();
  const session = await getSession(context);
  const backend = backendFn();
  const site = await backend.sites().current;
  const { navigation } = site;

  return {
    props: {
      ...page,
      navigation,
      providers,
      session,
    },
  };
}

export default SignIn;
