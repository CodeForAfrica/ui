import React from 'react';

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
  // filter: propsFilter,
  // location,
  // history,
  enableShowMore,
  // disableFilterHistory,
  // location: { search },
  ...props
}) {
  const classes = useStyles(props);
  // const params = new URLSearchParams(search);
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
          // to={`/promises?${filtersQueryString()}`}
          color="primary"
        >
          SHOW MORE
        </Button>
      )}
    </Layout>
  );
}

PromisesSection.propTypes = {
  enableShowMore: propTypes.bool
  // disableFilterHistory: propTypes.bool,
  // /location: propTypes.location.isRequired,
  // history: propTypes.history.isRequired,
  // children: propTypes.children.isRequired,
  // filter: propTypes.shape({
  // status: propTypes.string,
  // term: propTypes.string,
  // topic: propTypes.string
  // }),
  // location: propTypes.shape({
  // search: propTypes.string
  // }).isRequired
};

PromisesSection.defaultProps = {
  enableShowMore: false
  // disableFilterHistory: false
  // filter: {
  // status: undefined,
  // term: undefined,
  // topic: undefined
  // }
};

export default withRouter(PromisesSection);
