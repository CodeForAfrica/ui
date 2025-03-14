import { Section } from "@commons-ui/core";
import makeStyles from "@mui/styles/makeStyles";
import PropTypes from "prop-types";
import React from "react";

import RelatedArticles from "@/promisetracker/components/LatestArticles";
import Subscribe from "@/promisetracker/components/Newsletter";
import Page from "@/promisetracker/components/Page";
import Promise from "@/promisetracker/components/Promise";
import PromiseTimeline from "@/promisetracker/components/PromiseTimeline";
import backendFn from "@/promisetracker/lib/backend";
import i18n from "@/promisetracker/lib/i18n";
import wp from "@/promisetracker/lib/wp";

const useStyles = makeStyles(
  ({ breakpoints, palette, typography, widths }) => ({
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
    relatedArticles: {
      marginBottom: typography.pxToRem(43),
      [breakpoints.up("lg")]: {
        marginBottom: typography.pxToRem(76),
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
    promiseTimeline: {
      backgroundColor: palette.secondary.light,
    },
    timeline: {
      [breakpoints.up("lg")]: {
        margin: `${typography.pxToRem(36)} 0`,
      },
    },
  }),
);

function PromisePage({
  footer,
  navigation,
  promise,
  labels,
  promiseStatuses,
  title: titleProp,
  ...props
}) {
  const classes = useStyles(props);
  const title = promise?.title ? `${promise.title} | ${titleProp}` : titleProp;

  if (!promise) {
    return null;
  }
  const { events, date, status, statusHistory } = promise;

  return (
    <Page
      {...props}
      footer={footer}
      navigation={navigation}
      title={title}
      classes={{ section: classes.section, footer: classes.footer }}
    >
      <div className={classes.promiseTimeline}>
        <Section
          classes={{
            root: classes.section,
          }}
        >
          <PromiseTimeline
            events={events}
            date={date}
            status={status}
            statusHistory={statusHistory}
            classes={{ root: classes.timeline }}
          />
        </Section>
      </div>
      <Promise promise={promise} {...labels} {...props} />
      <RelatedArticles
        items={promise.relatedArticles}
        title="Related Articles"
        classes={{
          section: classes.section,
          sectionTitle: classes.sectionTitle,
          root: classes.relatedArticles,
        }}
      />
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
    events: PropTypes.arrayOf(PropTypes.shape({})),
    image: PropTypes.string,
    title: PropTypes.string,
    status: PropTypes.shape({
      color: PropTypes.string,
    }),
    statusHistory: PropTypes.arrayOf(PropTypes.shape({})),
    relatedPromises: PropTypes.arrayOf(PropTypes.shape({})),
    relatedArticles: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  promiseStatuses: PropTypes.shape({}),
  title: PropTypes.string,
};

export async function getStaticPaths() {
  const fallback = false;

  const backend = backendFn();
  const promisesApi = backend.promises();
  const promises = await promisesApi.all;

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
  const actNowPage = await wpApi.pages({ slug: "act-now", locale }).first;

  const backend = backendFn();
  const promisePost = await backend.promises({ id }).first;
  const promiseStatuses = await backend.promises({ id }).statuses;
  const site = await backend.sites().current;

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
    `/promises/${id}/${promisePost.slug}`,
  );
  return {
    props: {
      // NOTE(Kilemensi): WP pages set null to any prop that doesn't exist
      //                  e.g. navigation. While a page shoudl be allowed to
      //                  override site settings, for now we're going to
      //                  reverse the order until we can completely remove
      //                  WP dependency.
      ...page,
      ...actNowPage,
      ...site,
      errorCode,
      languageAlternates,
      promise,
      promiseStatuses,
    },
    revalidate: 2 * 60, // seconds
  };
}

export default PromisePage;
