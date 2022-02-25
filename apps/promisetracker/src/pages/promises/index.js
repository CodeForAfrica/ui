import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import ActNow from "@/promisetracker/components/ActNow";
import Subscribe from "@/promisetracker/components/Newsletter";
import Page from "@/promisetracker/components/Page";
import Promises from "@/promisetracker/components/Promises";
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
  actNow: {
    display: "none",
    [breakpoints.up("lg")]: {
      display: "flex",
    },
  },
  footer: {
    marginTop: 0,
  },
}));

function PromisesPage({
  footer,
  navigation,
  promises,
  actNow,
  actNowEnabled,
  subscribe,
  title,
  projectMeta,
  promiseStatuses,
  sortLabels,
  ...props
}) {
  const classes = useStyles(props);
  return (
    <Page
      {...props}
      footer={footer}
      navigation={navigation}
      title={title}
      classes={{ section: classes.section, footer: classes.footer }}
    >
      <Promises
        promiseStatuses={promiseStatuses}
        sortLabels={sortLabels}
        items={promises}
        projectMeta={projectMeta}
        title={title}
        classes={{
          section: classes.section,
        }}
      />
      {actNowEnabled ? (
        <ActNow
          {...actNow}
          classes={{ section: classes.section, root: classes.actNow }}
        />
      ) : null}
      <Subscribe
        {...subscribe}
        classes={{
          section: classes.section,
        }}
      />
    </Page>
  );
}

PromisesPage.propTypes = {
  actNow: PropTypes.shape({}),
  actNowEnabled: PropTypes.bool,
  footer: PropTypes.shape({}),
  projectMeta: PropTypes.shape({}),
  navigation: PropTypes.shape({}),
  promises: PropTypes.arrayOf(PropTypes.shape({})),
  subscribe: PropTypes.shape({}),
  sortLabels: PropTypes.shape({}),
  promiseStatuses: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.string,
};

PromisesPage.defaultProps = {
  actNow: undefined,
  actNowEnabled: undefined,
  promises: undefined,
  sortLabels: undefined,
  promiseStatuses: undefined,
  projectMeta: undefined,
  footer: undefined,
  navigation: undefined,
  subscribe: undefined,
  title: undefined,
};

export async function getStaticProps({ locale }) {
  const _ = i18n();
  if (!_.locales.includes(locale)) {
    return {
      notFound: true,
    };
  }

  const page = await wp().pages({ slug: "promises", locale }).first;

  const backend = backendFn();
  const sitesApi = backend.sites();
  const {
    navigation,
    statuses: promiseStatuses,
    ...site
  } = await sitesApi.current;
  const projectApi = backend.project();
  const projectMeta = await projectApi.meta;

  const promisesApi = backend.promises();
  const promises = await promisesApi.all;
  projectMeta.tags = promisesApi.categories;

  const languageAlternates = _.languageAlternates("/promises");

  return {
    props: {
      ...page,
      ...site,
      languageAlternates,
      navigation,
      promises,
      projectMeta,
      promiseStatuses,
    },
    revalidate: 2 * 60, // seconds
  };
}

export default PromisesPage;
