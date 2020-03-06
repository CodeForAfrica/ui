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
  Navigator as PromiseNavigator,
  TimelineEntry as PromiseTimelineEntry
} from 'components/Promise';
import Layout from 'components/Layout';
import Page from 'components/Page';
import TitledGrid from 'components/TiltedGrid';

import filterData from 'data';
import fetchPromises from 'lib/fetchPromises';
import findTerm from 'lib/findTerm';
import findActivityLog from 'lib/findActivityLog';
import convertDateObj from 'lib/convertDateObj';

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
  },
  description: {
    marginTop: '1rem'
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

  function trimData(value) {
    return value
      .replace(/[-]+/g, '')
      .replace(/[...]/g, '')
      .replace(/^\s+/g, '')
      .replace(/\s*$/, '')
      .replace(/\s+/g, '-')
      .toLowerCase();
  }

  const activityLog = findActivityLog(promise);
  const getTimeline = activityLog.map(({ node }) =>
    node.event_type === 'create_dynamicannotationfield'
      ? {
          status: trimData(JSON.parse(node.object_changes_json).value[1]),
          time: convertDateObj(node.created_at)
        }
      : {
          status: trimData(JSON.parse(node.object_changes_json).value[1]),
          time: convertDateObj(node.task.updated_at)
        }
  );
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
              term={findTerm(promise)}
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

            <TitledGrid
              container
              item
              direction="column"
              spacing={1}
              variant="h4"
              title="Promise Timeline"
            >
              <Grid item>
                {getTimeline
                  .sort()
                  .reverse()
                  .map((value, i) => (
                    <PromiseTimelineEntry
                      key={value.status}
                      defaultExpanded={i === 0}
                      updated={value.time.toLocaleDateString()}
                      status={value.status}
                    />
                  ))}
              </Grid>
            </TitledGrid>

            <TitledGrid
              item
              variant="h6"
              title="Description of the promise"
              className={classes.typo}
            >
              <Typography variant="body2" className={classes.description}>
                {promise.description || ''}
              </Typography>
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
                      term={
                        filterData.terms.find(
                          s => s.slug === slugify(findTerm(topic))
                        ).name
                      }
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
