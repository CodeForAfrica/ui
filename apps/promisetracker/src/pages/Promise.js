import React from 'react';
import { Grid, makeStyles, Divider, Typography } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

import Page from '../components/Page';
import propTypes from '../components/propTypes';
import Layout from '../components/Layout';
import {
  Card as PromiseCard,
  Header as PromiseHeader,
  Navigator as PromiseNavigator,
  TimelineEntry as PromiseTimelineEntry
} from '../components/Promise';
import TitledGrid from '../components/TitledGrid';
import SideBar from '../components/Articles/Sidebar';

import config from '../config';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '4rem 0',
    padding: '5rem 0'
  },
  sidebar: {
    borderLeft: `1px solid ${theme.palette.divider}`
  },
  divider: {
    padding: '3rem 0'
  },
  typo: {
    padding: '2rem 0'
  }
}));

function PromisePage({
  match: {
    params: { slug }
  }
}) {
  const classes = useStyles();

  const index = config.promises.findIndex(promise => promise.slug === slug);
  if (index === -1) {
    return <Redirect to={`/404/?${window.location.pathname}`} />;
  }

  const promise = config.promises[index];
  const currentTopic = promise.topic;

  const currentRelatedTopic = [];
  const relatedTopic = config.promises.filter(function(promiseItem) {
    return promiseItem.topic === currentTopic;
  });
  currentRelatedTopic.push(relatedTopic);

  const { timelines } = promise;
  // Lets use null to ensure the nothing is rendered: undefined seems to
  // render `0`
  const prevPromise = index ? config.promises[index - 1] : null;
  const nextPromise =
    index < config.promises.length - 1 && config.promises[index + 1];

  const previous = prevPromise && {
    href: `/promise/${prevPromise.slug}`,
    label: prevPromise.title
  };
  const next = nextPromise && {
    href: `/promise/${nextPromise.slug}`,
    label: nextPromise.title
  };

  return (
    <Page fixNavigation={false}>
      <Layout classes={{ root: classes.root }} spacing={8}>
        <Grid item xs={12} md={8}>
          <PromiseHeader
            status={promise.status}
            term={promise.term}
            topic={promise.topic}
            title={promise.title}
          />
          <Grid item xs={12} className={classes.divider}>
            <Divider />
          </Grid>

          <TitledGrid
            container
            item
            direction="column"
            spacing={1}
            variant="h4"
            title="Promise Timeline"
          >
            {timelines.map(timeline => (
              <Grid item>
                <PromiseTimelineEntry
                  defaultExpanded
                  updated={timeline.updated}
                  status={timeline.status}
                />
              </Grid>
            ))}
          </TitledGrid>

          <TitledGrid
            item
            variant="h5"
            title="About the promise"
            className={classes.typo}
          >
            <Typography />
          </TitledGrid>

          <Grid item>
            <PromiseNavigator previous={previous} next={next} />
          </Grid>
        </Grid>
        <Grid item xs={12} md={4} className={classes.sidebar}>
          <Grid container spacing={4}>
            <TitledGrid
              item
              xs={12}
              container
              spacing={2}
              variant="h4"
              title="Related Promises"
            >
              <Grid item xs={12}>
                <PromiseCard
                  status={promise.status}
                  title={promise.title}
                  term={promise.term}
                  topic={promise.topic}
                  slug={promise.slug}
                />
              </Grid>
            </TitledGrid>
            <SideBar />
            <Grid container item>
              <Divider />
            </Grid>
          </Grid>
        </Grid>
      </Layout>
    </Page>
  );
}

PromisePage.propTypes = {
  match: propTypes.match.isRequired
};

export default PromisePage;
