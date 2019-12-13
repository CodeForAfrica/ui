import React, { useCallback } from 'react';

import { Grid, Button, makeStyles } from '@material-ui/core';

import { useRouter } from 'next/router';

import propTypes from 'components/propTypes';

import Layout from 'components/Layout';
import Select from 'components/Select';
import PromiseCard from 'components/Promise/Card';

import Link from 'components/Link';

import filterData from 'data';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const useStyles = makeStyles({
  root: props => ({
    background: props.color || 'rgb(246, 246, 246)',
    padding: '2rem 0rem 4.125rem'
  }),
  cardsContainer: {
    padding: '2rem 0rem',
    margin: '0 0.5rem'
  },
  mainGrid: {
    margin: '0 0.5rem'
  },
  button: { paddingTop: '3rem' }
});

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

function PromisesSection({ enableShowMore, filter, ...props }) {
  const classes = useStyles(props);
  const router = useRouter();

  const { loading, error, data } = useQuery(GET_PROMISES);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return null;
  }

  const updateFilter = useCallback(
    (name, value) => {
      const { pathname } = router;
      const query = Object.entries({ ...filter, [name]: value })
        .filter(([, v]) => v)
        .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
      router.push({ pathname, query });
    },
    [filter]
  );

  const filtersQueryString = useCallback(() => {
    const params = new URLSearchParams();
    const { status, term, topic } = filter;
    if (status) {
      params.set('status', status);
    }
    if (term) {
      params.set('term', term);
    }
    if (topic) {
      params.set('topic', topic);
    }
    const search = params.toString();
    return search ? `?${search}` : '';
  }, [filter]);

  return (
    <Layout justify="center" classes={{ root: classes.root }}>
      <Grid
        item
        xs={12}
        container
        justify="flex-start"
        direction="row"
        spacing={4}
        className={classes.mainGrid}
      >
        <Grid item xs={6} sm={4} md={2}>
          <Select
            showIndicator={filter.status}
            value={filter.status}
            onChange={value => updateFilter('status', value)}
            options={[
              {
                value: '',
                name: 'All Statuses'
              },
              ...filterData.statusTypes.map(status => ({
                name: status.name,
                value: status.slug
              }))
            ]}
          />
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <Select
            showIndicator={filter.term}
            value={filter.term}
            onChange={value => updateFilter('term', value)}
            options={[
              {
                value: '',
                name: 'All Terms'
              },
              ...filterData.terms.map(term => ({
                name: term.name,
                value: term.slug
              }))
            ]}
          />
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <Select
            showIndicator={filter.topic}
            value={filter.topic}
            onChange={value => updateFilter('topic', value)}
            options={[
              {
                value: '',
                name: 'All Topics'
              },
              ...filterData.topics.map(topic => ({
                name: topic.name,
                value: topic.slug
              }))
            ]}
          />
        </Grid>
      </Grid>

      {data.team.projects.edges.map(({ node }) => (
        <Grid
          item
          xs={12}
          container
          className={classes.cardsContainer}
          spacing={2}
          color="white"
        >
          {node.project_medias.edges
            .filter(
              ({ node: filterMedia }) =>
                (!filter.status ||
                  filterMedia.tasks.edges
                    .find(
                      ({ node: task }) =>
                        task.label === 'What is the status of the promise?'
                    )
                    .node.first_response_value.replace(/\s+/g, '-')
                    .toLowerCase() === filter.status) &&
                (!filter.term || filter.term === 'term-1') &&
                (!filter.topic ||
                  filterMedia.tags.edges
                    .map(({ node: topic }) =>
                      topic.tag_text.replace(/\s+/g, '-').toLowerCase()
                    )
                    .toString() === filter.topic)
            )
            .map(({ node: media }) => (
              <Grid key={media.id} item xs={12} sm={6} md={4}>
                <PromiseCard
                  href="promise/[id]"
                  as={`promise/${media.title
                    .replace(/\s+/g, '-')
                    .toLowerCase()}`}
                  term={filterData.terms.find(s => s.slug === 'term-1').name}
                  title={media.title}
                  topic={
                    filterData.topics.find(
                      s =>
                        s.slug ===
                        media.tags.edges
                          .map(({ node: topic }) =>
                            topic.tag_text.replace(/\s+/g, '-').toLowerCase()
                          )
                          .toString()
                    ).name
                  }
                  status={media.tasks.edges
                    .find(
                      ({ node: task }) =>
                        task.label === 'What is the status of the promise?'
                    )
                    .node.first_response_value.replace(/\s+/g, '-')
                    .toLowerCase()}
                />
              </Grid>
            ))}
        </Grid>
      ))}

      {enableShowMore && (
        <Grid item className={classes.button}>
          <Link href={`/promises${filtersQueryString()}`}>
            <Button variant="contained" color="primary">
              SHOW MORE
            </Button>
          </Link>
        </Grid>
      )}
    </Layout>
  );
}

PromisesSection.propTypes = {
  enableShowMore: propTypes.bool,
  filter: propTypes.shape({
    status: propTypes.string,
    term: propTypes.string,
    topic: propTypes.string
  })
};

PromisesSection.defaultProps = {
  enableShowMore: true,
  filter: {
    status: undefined,
    term: undefined,
    topic: undefined
  }
};

export default PromisesSection;
