import React, { useCallback, useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/styles';
import { withRouter } from 'react-router';
import { Grid, Button } from '@material-ui/core';
import propTypes from '../../components/propTypes';

import Layout from '../../components/Layout';
import Select from '../../components/Select';
import PromiseCard from '../../components/Promise/Card';
import RouterLink from '../../components/RouterLink';

import config from '../../config';

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
  }
});

function PromisesSection({
  enableShowMore,
  filter: propsFilter,
  location,
  history,
  disableFilterHistory,
  ...props
}) {
  const classes = useStyles(props);
  const [filter, setFilter] = useState({
    status: propsFilter.status || 'all',
    term: propsFilter.term || 'all',
    topic: propsFilter.topic || 'all'
  });

  const updateFilter = useCallback(
    (name, value) => {
      setFilter({ ...filter, [name]: value });
      const params = new URLSearchParams(location.search);
      if (value !== 'all') {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      if (!disableFilterHistory) {
        history.push(`?${params.toString()}`, filter);
      }
    },
    [disableFilterHistory, filter, history, location]
  );

  useEffect(() => {
    function updateFilterWithQueryOnBack() {
      // important: use window.location instead of router location
      // window.location has the route we went back to
      const params = new URLSearchParams(window.location.search);
      if (
        (params.get('status') || 'all') !== filter.status ||
        (params.get('term') || 'all') !== filter.term ||
        (params.get('topic') || 'all') !== filter.topic
      ) {
        setFilter({
          status: params.get('status') || 'all',
          term: params.get('term') || 'all',
          topic: params.get('topic') || 'all'
        });
      }
    }
    window.addEventListener('popstate', updateFilterWithQueryOnBack);
    return () => {
      window.removeEventListener('popstate', updateFilterWithQueryOnBack);
    };
  }, [filter]);

  const filtersQueryString = useCallback(() => {
    const params = new URLSearchParams();

    if (filter.status !== 'all') {
      params.set('status', filter.status);
    }
    if (filter.term !== 'all') {
      params.set('term', filter.term);
    }

    if (filter.topic !== 'all') {
      params.set('topic', filter.topic);
    }
    return params.toString();
  }, [filter.status, filter.term, filter.topic]);

  const { promises } = config;
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
              ...config.statusTypes.map(status => ({
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
              ...config.terms.map(term => ({
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
              ...config.topics.map(topic => ({
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
        {promises.map(promise => (
          <Grid item xs={12} sm={6} md={4}>
            <PromiseCard
              slug={promise.slug}
              status={promise.status}
              title={promise.title}
              term={promise.term}
              topic={promise.topic}
            />
          </Grid>
        ))}
      </Grid>
      {enableShowMore && (
        <Button
          variant="contained"
          component={RouterLink}
          to={`/promises?${filtersQueryString()}`}
          color="primary"
        >
          SHOW MORE
        </Button>
      )}
    </Layout>
  );
}

PromisesSection.propTypes = {
  enableShowMore: propTypes.bool,
  disableFilterHistory: propTypes.bool,
  location: propTypes.location.isRequired,
  history: propTypes.history.isRequired,
  filter: propTypes.shape({
    status: propTypes.string,
    term: propTypes.string,
    topic: propTypes.string
  })
};

PromisesSection.defaultProps = {
  enableShowMore: false,
  disableFilterHistory: false,
  filter: {
    status: undefined,
    term: undefined,
    topic: undefined
  }
};

export default withRouter(PromisesSection);
