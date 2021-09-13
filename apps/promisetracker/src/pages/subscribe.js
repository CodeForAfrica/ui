import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import ActNow from "@/promisetracker/components/ActNow";
import Subscribe from "@/promisetracker/components/Newsletter";
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

function SubscribePage({ actNow, footer, navigation, subscribe, ...props }) {
  const classes = useStyles(props);

  return (
    <Page
      {...props}
      footer={footer}
      navigation={navigation}
      classes={{ section: classes.section, footer: classes.footer }}
    >
      <Subscribe {...subscribe} classes={{ section: classes.section }} />
      <ActNow {...actNow} classes={{ section: classes.section }} />
    </Page>
  );
}

SubscribePage.propTypes = {
  actNow: PropTypes.shape({}),
  footer: PropTypes.shape({}),
  navigation: PropTypes.shape({}),
  subscribe: PropTypes.shape({}),
};

SubscribePage.defaultProps = {
  actNow: undefined,
  footer: undefined,
  navigation: undefined,
  subscribe: undefined,
};

export async function getStaticProps({ locale }) {
  const _ = i18n();
  if (!_.locales.includes(locale)) {
    return {
      notFound: true,
    };
  }

  const backend = backendFn();
  const site = await backend.sites().current;
  const { navigation } = site;
  const page = await wp().pages({ slug: "subscribe", locale }).first;
  const languageAlternates = _.languageAlternates("/subscribe");

  return {
    props: {
      ...page,
      languageAlternates,
      navigation,
    },
    revalidate: 2 * 60, // seconds
  };
}

export default SubscribePage;
