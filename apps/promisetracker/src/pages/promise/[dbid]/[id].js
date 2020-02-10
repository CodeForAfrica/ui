import React from 'react';
import { Grid, makeStyles, Divider, Typography } from '@material-ui/core';

import { useRouter } from 'next/router';
import Head from 'next/head';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import filterData from 'data';
import findStatus from 'lib/findStatus';
import slugify from 'lib/slugify';
import withApollo from 'lib/withApollo';

import {
  Card as PromiseCard,
  Header as PromiseHeader,
  SideBar,
  Navigator as PromiseNavigator
  // TimelineEntry as PromiseTimelineEntry
} from 'components/Promise';
import Layout from 'components/Layout';
import Page from 'components/Page';
import TitledGrid from 'components/TiltedGrid';

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

function PromisePage({ promises }) {
  const classes = useStyles();
  const router = useRouter();

  const index = promises.findIndex(
    media => slugify(media.title) === slugify(router.query.id)
  );

  if (index === -1) {
    return <div>{slugify(router.query.id)}</div>;
  }

  const promise = promises[index];
  const findStatus = promise.tasks.edges.find(
    ({ node: task }) => task.label === 'What is the status of the promise?'
  ).node.first_response_value;

  const currentTopic = promise.tags.edges
    .map(({ node: topic }) => slugify(topic.tag_text))
    .toString();

  const relatedTopic = promises.filter(
    promiseItem =>
      promiseItem !== promise &&
      promiseItem.tags.edges
        .map(({ node: relatedTopicTag }) => slugify(relatedTopicTag.tag_text))
        .toString() === currentTopic
  );

  // Lets use null to ensure the nothing is rendered: undefined seems to
  // render `0`
  const prevPromise = index ? promises[index - 1] : null;
  const nextPromise = index < promises.length - 1 && promises[index + 1];

  const previous = prevPromise && {
    href: `/promise/${prevPromise.dbid}/${slugify(prevPromise.title)}`,
    label: prevPromise.title
  };
  const next = nextPromise && {
    href: `/promise/${nextPromise.dbid}/${slugify(nextPromise.title)}`,
    label: nextPromise.title
  };

  return (
    <>
      <Head>
        <title>{promise.title} - Promise Tracker</title>
      </Head>
      <Page fixNavigation={false}>
        <Layout classes={{ root: classes.root }} spacing={8}>
          <Grid item xs={12} md={8}>
            <PromiseHeader
              key={promise.id}
              status={slugify(findStatus(promise))}
              term="Term 1"
              topic={
                (
                  filterData.topics.find(s => s.slug === currentTopic) || {
                    name: ''
                  }
                ).name
              }
              title={promise.title}
            />
            <Grid item xs={12} className={classes.divider}>
              <Divider />
            </Grid>

            {/* <TitledGrid
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
            </TitledGrid> */}

            <TitledGrid
              item
              variant="h5"
              title="About the promise"
              className={classes.typo}
            >
              <Typography>{promise.description || ''}</Typography>
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
                title={relatedTopic.length === 0 ? '' : 'Related Promises'}
              >
                {relatedTopic.map(topic => (
                  <Grid item xs={12} key={topic.id}>
                    <PromiseCard
                      title={topic.title}
                      description={topic.description || ''}
                      href="/promise/[dbid]/[id]"
                      as={`/promise/${topic.dbid}/${slugify(topic.title)}`}
                      term="Term 1"
                      topic={
                        filterData.topics.find(
                          s =>
                            s.slug ===
                            topic.tags.edges
                              .map(({ node: relatedTopicTag }) =>
                                slugify(relatedTopicTag.tag_text)
                              )
                              .toString()
                        ).name
                      }
                      status={slugify(findStatus(topic))}
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
    </>
  );
}

PromisePage.getInitialProps = fetchPromises;

export default PromisePage;
