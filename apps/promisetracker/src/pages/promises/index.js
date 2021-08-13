import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import ActNow from "@/promisetracker/components/ActNow";
import Subscribe from "@/promisetracker/components/Newsletter";
import Page from "@/promisetracker/components/Page";
import Promises from "@/promisetracker/components/Promises";
import check from "@/promisetracker/lib/check";
import i18n from "@/promisetracker/lib/i18n";
import JsonpromiseSource from "@/promisetracker/lib/json_source";
import wp from "@/promisetracker/lib/wp";
import { slugify } from "@/promisetracker/utils";

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
      <ActNow
        {...actNow}
        classes={{ section: classes.section, root: classes.actNow }}
      />
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
  const { promiseStatuses } = page;
  const promiseSourceLibs = {
    Json: JsonpromiseSource({ promiseStatuses }),
    Check: check({
      promiseStatuses,
      team: "pesacheck-promise-tracker",
    }),
  };

  const sourceLib = process.env.SOURCE_LIB || "Check";

  const api = promiseSourceLibs[sourceLib];

  const projectMeta = await api.projectMeta();
  const promises = await api.promises({
    limit: 10000,
    query: `{ "projects": ["2831"] }`,
  });
  const languageAlternates = _.languageAlternates("/promises");

  return {
    props: {
      ...page,
      languageAlternates,
      promises,
      projectMeta,
      promiseStatuses: promiseStatuses.map((status) => ({
        name: status.title,
        slug: slugify(status.title),
      })),
    },
    revalidate: 2 * 60, // seconds
  };
}

export default PromisesPage;
