import makeStyles from "@mui/styles/makeStyles";
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
import backendFn from "@/promisetracker/lib/backend";
import i18n from "@/promisetracker/lib/i18n";
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
  actNowEnabled,
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
        fullName={projectMeta.fullName}
        photo={projectMeta.photo}
        name={projectMeta.name}
        position={projectMeta.position}
        promiseLabel={projectMeta.promiseLabel}
        updatedAtLabel={projectMeta.updatedAtLabel}
        updatedAt={new Date(projectMeta.updatedAt)
          .toDateString({
            dateStyle: "short",
          })
          .split(" ")
          .slice(1)
          .join(" ")}
        tagline={projectMeta.tagline}
        title={projectMeta.description}
        trailText={projectMeta.trailText}
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
      {actNowEnabled ? (
        <ActNow
          {...actNow}
          classes={{
            section: classes.section,
          }}
        />
      ) : null}
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
  actNowEnabled: PropTypes.bool,
  articles: PropTypes.arrayOf(PropTypes.shape({})),
  criteria: PropTypes.shape({}),
  footer: PropTypes.shape({}),
  navigation: PropTypes.shape({}),
  partners: PropTypes.shape({}),
  projectMeta: PropTypes.shape({
    description: PropTypes.string,
    fullName: PropTypes.string,
    name: PropTypes.string,
    photo: PropTypes.string,
    position: PropTypes.string,
    promiseLabel: PropTypes.string,
    updatedAt: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    updatedAtLabel: PropTypes.string,
    tagline: PropTypes.string,
    trailText: PropTypes.string,
  }),
  promiseStatuses: PropTypes.arrayOf(PropTypes.shape({})),
  promises: PropTypes.arrayOf(PropTypes.shape({})),
  keyPromises: PropTypes.arrayOf(PropTypes.shape({})),
  promisesByStatus: PropTypes.shape({}),
  subscribe: PropTypes.shape({}),
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
  // const { promiseStatuses } = page;
  const backend = backendFn();
  const promisesApi = backend.promises();
  // const api = promisesApi({
  //   promiseStatuses,
  //   team: "pesacheck-promise-tracker",
  // });

  const promises = await promisesApi.all;
  // const promises = await api.promises({
  //   limit: 10000,
  //   query: `{ "projects": ["2831"] }`,
  // });
  const keyPromises = await promisesApi.key;
  // const keyPromises = await api.keyPromises({
  //   limit: 6,
  //   query: `{ "projects": ["4691"] }`,
  // });
  const articles = (await backend.articles().all)?.slice(0, 4) ?? null;
  // const posts = await wpApi.pages({ slug: "analysis-articles", locale }).posts;
  // const articles = posts?.slice(0, 4) || null;
  // const projectMeta = await api.projectMeta();
  const projectApi = backend.project();
  const site = await backend.sites().current;
  const { navigation } = site;
  const projectMeta = await projectApi.meta;
  const promisesByStatus = groupPromisesByStatus(promises);
  const languageAlternates = _.languageAlternates();

  const props = {
    ...page,
    articles,
    keyPromises,
    languageAlternates,
    navigation,
    promises: promises.slice(0, 6),
    promisesByStatus,
    projectMeta,
  };
  return {
    props,
    revalidate: 2 * 60, // seconds
  };
}

export default Index;
