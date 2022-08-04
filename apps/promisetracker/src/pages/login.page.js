import makeStyles from "@mui/styles/makeStyles";
import { getProviders, useSession } from "next-auth/react";
import Router from "next/router";
import PropTypes from "prop-types";
import React, { useEffect } from "react";

import LoginPage from "@/promisetracker/components/LoginPage";
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

function Login({ providers: providersProp, ...props }) {
  const { data: session, status } = useSession();

  const classes = useStyles(props);

  /**
   * Note: Using session in frontend is a workaround for Next.js SSR file system bug.(Tracked here https://www.pivotaltracker.com/story/show/181432688)
   */
  useEffect(() => {
    if (session && session?.user) {
      Router.push("/act-now");
    }
  }, [session]);

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && status === "loading") return null;

  return (
    <Page
      {...props}
      classes={{ section: classes.section, footer: classes.footer }}
    >
      <LoginPage
        classes={{ section: classes.section }}
        providers={providersProp}
      />
    </Page>
  );
}

Login.propTypes = {
  providers: PropTypes.shape({}),
};

Login.defaultProps = {
  providers: undefined,
};

export async function getStaticProps({ locale }) {
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
  const backend = backendFn();
  const site = await backend.sites().current;
  const { navigation } = site;

  return {
    props: {
      ...page,
      navigation,
      providers,
    },
  };
}

export default Login;
