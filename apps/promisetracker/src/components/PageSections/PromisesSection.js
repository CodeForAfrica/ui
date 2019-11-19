import React, { useCallback, useState, useEffect } from 'react';

import { Grid, Button, makeStyles } from '@material-ui/core';

import { useRouter } from 'next/router';

import propTypes from 'components/propTypes';

import Layout from 'components/Layout';
import Select from 'components/Select';
import PromiseCard from 'components/Promise/Card';

import Link from 'components/Link';

import data from 'data';

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

function PromisesSection({
  enableShowMore,
  filter: propsFilter,
  disableFilterHistory,
  ...props
}) {
  const classes = useStyles(props);
  const router = useRouter();

  const [filter, setFilter] = useState({
    status: propsFilter.status || 'all',
    term: propsFilter.term || 'all',
    topic: propsFilter.topic || 'all'
  });

  const updateFilter = useCallback(
    (name, value) => {
      setFilter({ ...filter, [name]: value });
    },
    [filter]
  );

  useEffect(() => {
    function updateFilterWithQueryOnBack() {
      // important: use window.location instead of router location
      // window.location has the route we went back to

      // Disclamer: Please disregard the above comment 😔😔🙅🏾‍♀️🙅🏾...
      // We are using Router because we all know that next.js routing is SONIC the 🦔 in real life

      const { status, term, topic } = router.query;
      if (
        (status || 'all') !== filter.status ||
        (term || 'all') !== filter.term ||
        (topic || 'all') !== filter.topic
      ) {
        setFilter({
          status: status || 'all',
          term: term || 'all',
          topic: topic || 'all'
        });
      }
    }
    window.addEventListener('popstate', updateFilterWithQueryOnBack);
    return () => {
      window.removeEventListener('popstate', updateFilterWithQueryOnBack);
    };
  }, [filter]);

  const { promises } = data;
  return (
    <Layout justify="center" classes={{ root: classes.root }}>
      <Grid
        container
        justify="flex-start"
        direction="row"
        spacing={4}
        className={classes.mainGrid}
      >
        <Grid item xs={6} sm={4} md={2}>
          <Select
            showIndicator={filter.status !== 'all'}
            value={filter.status}
            onChange={value => updateFilter('status', value)}
            options={[
              {
                value: 'all',
                name: 'All Statuses'
              },
              ...data.statusTypes.map(status => ({
                name: status.name,
                value: status.slug
              }))
            ]}
          />
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <Select
            showIndicator={filter.term !== 'all'}
            value={filter.term}
            onChange={value => updateFilter('term', value)}
            options={[
              {
                value: 'all',
                name: 'All Terms'
              },
              ...data.terms.map(term => ({
                name: term.name,
                value: term.slug
              }))
            ]}
          />
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <Select
            showIndicator={filter.topic !== 'all'}
            value={filter.topic}
            onChange={value => updateFilter('topic', value)}
            options={[
              {
                value: 'all',
                name: 'All Topics'
              },
              ...data.topics.map(topic => ({
                name: topic.name,
                value: topic.slug
              }))
            ]}
          />
        </Grid>
      </Grid>

      <Grid
        container
        className={classes.cardsContainer}
        spacing={2}
        color="white"
      >
        {promises
          .filter(
            filterPromise =>
              (filter.status === 'all' ||
                filterPromise.status === filter.status) &&
              (filter.term === 'all' || filterPromise.term === filter.term) &&
              (filter.topic === 'all' || filterPromise.topic === filter.topic)
          )
          .map(promise => (
            <Grid item xs={12} sm={6} md={4}>
              <PromiseCard
                href={`promise/${promise.slug}`}
                status={promise.status}
                title={promise.title}
                term={data.terms.find(s => s.slug === promise.term).name}
                topic={data.topics.find(s => s.slug === promise.topic).name}
              />
            </Grid>
          ))}
      </Grid>
      {enableShowMore && (
        <Grid item className={classes.button}>
          <Link href="/promises">
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
  disableFilterHistory: propTypes.bool,
  filter: propTypes.shape({
    status: propTypes.string,
    term: propTypes.string,
    topic: propTypes.string
  })
};

PromisesSection.defaultProps = {
  enableShowMore: true,
  disableFilterHistory: false,
  filter: {
    status: undefined,
    term: undefined,
    topic: undefined
  }
};

export default PromisesSection;
