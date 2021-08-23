import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import ActNow from "@/promisetracker/components/ActNow";
import Hero from "@/promisetracker/components/Hero";
import KeyPromises from "@/promisetracker/components/KeyPromises";
import LatestArticles from "@/promisetracker/components/LatestArticles";
import LatestPromises from "@/promisetracker/components/LatestPromises";
import Subscribe from "@/promisetracker/components/Newsletter";
import Page from "@/promisetracker/components/Page";
import Partners from "@/promisetracker/components/Partners";
import check from "@/promisetracker/lib/check";
import i18n from "@/promisetracker/lib/i18n";
import JsonpromiseSource from "@/promisetracker/lib/jsonSource";
import wp from "@/promisetracker/lib/wp";
import { groupPromisesByStatus } from "@/promisetracker/utils";

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

function Index({
  actNow,
  articles,
  criteria,
  footer,
  navigation,
  partners,
  promiseStatuses,
  promises,
  projectMeta,
  keyPromises,
  promisesByStatus,
  subscribe,
  ...props
}) {
  const classes = useStyles(props);

  return (
    <Page
      {...props}
      footer={footer}
      navigation={navigation}
      classes={{ section: classes.section, footer: classes.footer }}
    >
      <Hero
        promisesByStatus={promisesByStatus}
        criteria={criteria}
        name={projectMeta.name}
        position={projectMeta.position}
        promiseLabel={projectMeta.promiseLabel}
        updatedAtLabel={projectMeta.updatedAtLabel}
        trailText={projectMeta.trailText}
        updatedAt={new Date(projectMeta.updatedAt)
          .toDateString({
            dateStyle: "short",
          })
          .split(" ")
          .slice(1)
          .join(" ")}
        title={projectMeta.description}
        classes={{ section: classes.section }}
      />
      <KeyPromises
        actionLabel="Learn More"
        items={keyPromises}
        title="Key Promises"
        classes={{
          section: classes.section,
        }}
      />
      <LatestPromises
        actionLabel="See All"
        items={promises.slice(0, 6)}
        title="Latest Promises"
        classes={{
          section: classes.section,
        }}
      />
      <ActNow
        {...actNow}
        classes={{
          section: classes.section,
        }}
      />
      <LatestArticles
        actionLabel="See All"
        items={articles}
        title="Latest Articles"
        classes={{
          section: classes.section,
        }}
      />
      <Partners
        {...partners}
        classes={{
          section: classes.section,
        }}
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

Index.propTypes = {
  actNow: PropTypes.shape({}),
  articles: PropTypes.arrayOf(PropTypes.shape({})),
  criteria: PropTypes.shape({}),
  footer: PropTypes.shape({}),
  navigation: PropTypes.shape({}),
  partners: PropTypes.shape({}),
  projectMeta: PropTypes.shape({
    name: PropTypes.string,
    position: PropTypes.string,
    trailText: PropTypes.string,
    updatedAt: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    updatedAtLabel: PropTypes.string,
    description: PropTypes.string,
    promiseLabel: PropTypes.string,
  }),
  promiseStatuses: PropTypes.arrayOf(PropTypes.shape({})),
  promises: PropTypes.arrayOf(PropTypes.shape({})),
  keyPromises: PropTypes.arrayOf(PropTypes.shape({})),
  promisesByStatus: PropTypes.shape({}),
  subscribe: PropTypes.shape({}),
};

Index.defaultProps = {
  actNow: undefined,
  articles: undefined,
  criteria: undefined,
  footer: undefined,
  navigation: undefined,
  partners: undefined,
  promiseStatuses: undefined,
  promises: undefined,
  keyPromises: undefined,
  promisesByStatus: undefined,
  subscribe: undefined,
  projectMeta: undefined,
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

  const promises = await api.promises({
    limit: 10000,
    query: `{ "projects": ["2831"] }`,
  });
  const keyPromises = await api.keyPromises({
    limit: 6,
    query: `{ "projects": ["4691"] }`,
  });
  const posts = await wpApi.pages({ slug: "analysis-articles", locale }).posts;
  const articles = posts?.slice(0, 4) || null;
  const projectMeta = await api.projectMeta();
  const languageAlternates = _.languageAlternates();

  return {
    props: {
      ...page,
      articles,
      keyPromises,
      languageAlternates,
      promises: promises.slice(0, 6),
      keyPromises,
      promisesByStatus: groupPromisesByStatus(promises),
      projectMeta,
    },
    revalidate: 2 * 60, // seconds
  };
}

export default Index;
