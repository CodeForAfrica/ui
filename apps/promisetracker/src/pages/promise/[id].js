import React from 'react';
import { Grid, makeStyles, Divider, Typography } from '@material-ui/core';

import { useRouter } from 'next/router';
import Head from 'next/head';

import withApollo from 'lib/withApollo';
import slugify from 'lib/slugify';

import Page from 'components/Page';
import Layout from 'components/Layout';
import {
  Card as PromiseCard,
  Header as PromiseHeader,
  Navigator as PromiseNavigator
  // TimelineEntry as PromiseTimelineEntry
} from 'components/Promise';

import TitledGrid from 'components/TiltedGrid';
import SideBar from 'components/Article/SideBar';

import filterData from 'data';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

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

const GET_PROMISES = gql`
  query {
    team {
      id
      name
      projects {
        edges {
          node {
            id
            title
            project_medias(last: 6) {
              edges {
                node {
                  id
                  dbid
                  title
                  tasks {
                    edges {
                      node {
                        id
                        label
                        first_response_value
                      }
                    }
                  }
                  tags {
                    edges {
                      node {
                        id
                        tag_text
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

function PromisePage() {
  const classes = useStyles();
  const router = useRouter();

  const { loading, error, data } = useQuery(GET_PROMISES);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return null;
  }

  const promises = data.team.projects.edges.map(({ node: project }) => project);
  const medias = promises[0].project_medias.edges.map(
    ({ node: media }) => media
  );
  const index = medias.findIndex(
    media => slugify(media.title) === slugify(router.query.id)
  );

  if (index === -1) {
    return <div>{slugify(router.query.id)}</div>;
  }

  const promise = medias[index];

  const findStatus = promise.tasks.edges.find(
    ({ node: task }) => task.label === 'What is the status of the promise?'
  ).node.first_response_value;

  const currentTopic = promise.tags.edges
    .map(({ node: topic }) => slugify(topic.tag_text))
    .toString();

  const relatedTopic = medias.filter(
    promiseItem =>
      promiseItem !== promise &&
      promiseItem.tags.edges
        .map(({ node: relatedTopicTag }) => slugify(relatedTopicTag.tag_text))
        .toString() === currentTopic
  );

  // Lets use null to ensure the nothing is rendered: undefined seems to
  // render `0`
  const prevPromise = index ? medias[index - 1] : null;
  const nextPromise = index < medias.length - 1 && medias[index + 1];

  const previous = prevPromise && {
    href: `/promise/${slugify(prevPromise.title)}`,
    label: prevPromise.title
  };
  const next = nextPromise && {
    href: `/promise/${slugify(nextPromise.title)}`,
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
              status={slugify(findStatus)}
              term="Term 1"
              topic={filterData.topics.find(s => s.slug === currentTopic).name}
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
                      key={topic.id}
                      status="stalled"
                      title={topic.title}
                      href="/promise/[id]"
                      as={`/promise/${slugify(topic.title)}`}
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

export default withApollo(PromisePage);
