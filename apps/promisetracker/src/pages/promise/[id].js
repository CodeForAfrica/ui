import React from 'react';
import { Grid, makeStyles, Divider, Typography } from '@material-ui/core';

import { useRouter } from 'next/router';

import Page from '../../component/Page';
import propTypes from '../../component/propTypes';
import Layout from '../../component/Layout';
import {
  Card as PromiseCard,
  Header as PromiseHeader,
  Navigator as PromiseNavigator,
  TimelineEntry as PromiseTimelineEntry
} from '../../component/Promise';

import TitledGrid from '../../component/TiltedGrid';
import SideBar from '../../component/Article/Sidebar';

import data from '../../data';

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

function PromisePage({}) {
  const classes = useStyles();
   const router = useRouter();

  const index = data.promises.findIndex(promise => promise.slug === router.query.id);
  if (index === -1) {
    return <div>redirecting to this page</div>;
  }
  const promise = data.promises[index];
  const currentTopic = promise.topic;
  const relatedTopic = data.promises.filter(function(promiseItem) {
    return promiseItem !== promise && promiseItem.topic === currentTopic;
  });

  // Lets use null to ensure the nothing is rendered: undefined seems to
  // render `0`
  const prevPromise = index ? data.promises[index - 1] : null;
  const nextPromise =
    index < data.promises.length - 1 && data.promises[index + 1];

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
            {promise.timeline.map(timeline => (
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
              {relatedTopic.map(topic => (
                <Grid item xs={12}>
                  <PromiseCard
                    status={topic.status}
                    title={topic.title}
                    term={topic.term}
                    topic={topic.topic}
                    href={topic.slug}
                  />
                </Grid>
              ))}
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




