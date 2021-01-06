import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";

import Page from "@/promisetracker/components/Page";
import Promise from "@/promisetracker/components/Promise";
import RelatedPromises from "@/promisetracker/components/Promises";
import Subscribe from "@/promisetracker/components/Newsletter";

import check from "@/promisetracker/lib/check";
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
  sectionTitle: {
    marginBottom: typography.pxToRem(21),
    marginTop: typography.pxToRem(46),
    [breakpoints.up("lg")]: {
      marginTop: typography.pxToRem(96),
    },
    fontWeight: 400,
    "&:after": {
      borderBottom: "none",
    },
  },
  footer: {
    marginTop: 0,
  },
}));

function PromisePage({
  footer,
  navigation,
  promise,
  labels,
  title: titleProp,
  ...props
}) {
  const classes = useStyles(props);
  const title = promise?.title ? `${promise.title} | ${titleProp}` : titleProp;

  return (
    <Page
      {...props}
      footer={footer}
      navigation={navigation}
      title={title}
      classes={{ section: classes.section, footer: classes.footer }}
    >
      {promise && (
        <>
          <Promise promise={promise} {...labels} />
          <RelatedPromises
            items={promise?.relatedPromises}
            title="Related Promises"
            withFilter={false}
            classes={{
              section: classes.section,
              sectionTitle: classes.sectionTitle,
            }}
          />
        </>
      )}
      <Subscribe
        classes={{
          section: classes.section,
        }}
      />
    </Page>
  );
}

PromisePage.propTypes = {
  classes: PropTypes.shape({
    section: PropTypes.string,
    sectionTitle: PropTypes.string,
  }),
  labels: PropTypes.shape({}),
  footer: PropTypes.shape({}),
  navigation: PropTypes.shape({}),
  promise: PropTypes.shape({
    date: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    relatedPromises: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  title: PropTypes.string,
};

PromisePage.defaultProps = {
  classes: undefined,
  footer: undefined,
  labels: undefined,
  navigation: undefined,
  promise: undefined,
  title: undefined,
};

export async function getStaticPaths() {
  const fallback = false;
  const wpApi = wp();
  const page = await wpApi.pages({ slug: "promises" }).first;
  const { promiseStatuses } = page;
  const checkApi = check({
    promiseStatuses,
    team: "pesacheck-promise-tracker",
  });
  const promises = await checkApi.promises({
    limit: 10000,
    query: `{ "projects": ["2831"] }`,
  });

  const unlocalizedPaths = promises.map((promise) => ({
    params: { slug: [`${promise.id}`, promise.slug] },
  }));
  const paths = i18n().localizePaths(unlocalizedPaths);

  return { fallback, paths };
}

export async function getStaticProps({ params: { slug: slugParam }, locale }) {
  const _ = i18n();
  const id = slugParam[0];
  if (!_.locales.includes(locale)) {
    return {
      notFound: true,
    };
  }
  const wpApi = wp();
  const page = await wpApi.pages({ slug: "promises", locale }).first;
  const { promiseStatuses } = page;

  const checkApi = check({
    promiseStatuses,
    team: "pesacheck-promise-tracker",
  });

  const promisePost = await checkApi.promise({
    id,
    limit: 100,
    query: `{ "projects": ["2831"] }`,
  });

  const notFound = !promisePost;
  if (notFound) {
    return {
      notFound,
    };
  }

  const errorCode = notFound ? 404 : null;

  const promise = {
    ...promisePost,
    attribution: {
      title: "",
      description: "",
    },
    labels: {
      dataSourceEmbedLabel: page.data_source_embed_label,
      narrativeUpdatesLabel: page.narrative_updates_label,
      chartEmbedLabel: page.chart_embed_label,
      authorAttributionLabel: page.author_attribution_label,
      promiseStatusLabel: page.promise_status_label,
      promiseRadarLabel: page.promise_radar_label,
      relatedFactChecksLabel: page.related_fact_checks_label,
    },
    narrative: {},
  };

  const languageAlternates = _.languageAlternates(
    `/promises/${id}/${promisePost.slug}`
  );

  return {
    props: {
      ...page,
      errorCode,
      languageAlternates,
      promise,
    },
    revalidate: 2 * 60, // seconds
  };
}

export default PromisePage;
