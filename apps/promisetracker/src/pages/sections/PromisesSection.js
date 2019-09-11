import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import Layout from '../../components/Layout';
import Select from '../../components/Select';
import propTypes from '../../components/propTypes';

const statusColors = {
  achieved: 'rgb(50, 112, 174)',
  compromised: 'rgb(112, 68, 135)',
  'in-progress': 'rgb(38, 143, 130)',
  'not-achieved': 'rgb(221, 87, 84)',
  stalled: 'rgb(216, 159, 67)',
  inactive: 'rgb(141, 141, 141)'
};

const statuses = [
  {
    slug: 'achieved',
    name: 'Achieved'
  },
  {
    slug: 'compromised',
    name: 'Compromised'
  },
  {
    slug: 'in-progress',
    name: 'In Progress'
  },
  {
    slug: 'not-achieved',
    name: 'Not Achieved'
  },
  {
    slug: 'stalled',
    name: 'Stalled'
  },
  {
    slug: 'inactive',
    name: 'Inactive'
  }
];

const terms = [
  {
    slug: 'term-1',
    name: 'Term 1'
  },
  {
    slug: 'term 2',
    name: 'Term 2'
  }
];

const topics = [
  {
    slug: 'economy',
    name: 'Economy'
  },
  {
    slug: 'foreign-policy',
    name: 'Foreign Policy'
  },
  {
    slug: 'domestic-policy',
    name: 'Domestic Policy'
  },
  {
    slug: 'socio-cultural',
    name: 'Socio Cultural'
  }
];

const useStyles = makeStyles({
  root: props => ({
    background: props.color || 'rgb(246, 246, 246)',
    padding: '2rem 0rem 4.125rem'
  }),
  cardsContainer: {
    padding: '2rem 0rem'
  }
});

function PromisesSection({
  children,
  filter: propsFilter,
  showIndicator,
  ...props
}) {
  const classes = useStyles(props);
  const [filter, setFilter] = useState({
    status: propsFilter.status || 'all',
    term: propsFilter.term || 'all',
    topic: propsFilter.topic || 'all'
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (
      (params.get('status') || 'all') !== filter.status ||
      (params.get('term') || 'all') !== filter.term ||
      (params.get('topic') || 'all') !== filter.topic
    ) {
      if (filter.status !== 'all') {
        params.set('status', filter.status);
      } else {
        params.delete('status');
      }
      if (filter.term !== 'all') {
        params.set('term', filter.term);
      } else {
        params.delete('term');
      }
      if (filter.topic !== 'all') {
        params.set('topic', filter.topic);
      } else {
        params.delete('topic');
      }
      window.location.replace(`/promises?${params.toString()}`);
    }
  }, [filter]);
  return (
    <div className={classes.root}>
      <Layout>
        <Grid
          item
          container
          justify="flex-start"
          spacing={1}
          style={{ maxWidth: '37.5rem' }}
        >
          <Grid item xs={6} sm={4}>
            <Select
              showIndicator={filter.status !== 'all' && showIndicator}
              indicatorColor={
                filter.status !== 'all' && statusColors[filter.status]
              }
              value={filter.status}
              onChange={value => setFilter({ ...filter, status: value })}
              options={[
                {
                  value: 'all',
                  name: 'All Statuses'
                },
                ...statuses.map(status => ({
                  name: status.name,
                  value: status.slug
                }))
              ]}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <Select
              showIndicator={filter.term !== 'all' && showIndicator}
              value={filter.term}
              onChange={value => setFilter({ ...filter, term: value })}
              options={[
                {
                  value: 'all',
                  name: 'All Terms'
                },
                ...terms.map(term => ({
                  name: term.name,
                  value: term.slug
                }))
              ]}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <Select
              showIndicator={filter.topic !== 'all' && showIndicator}
              value={filter.topic}
              onChange={value => setFilter({ ...filter, topic: value })}
              options={[
                {
                  value: 'all',
                  name: 'All Topics'
                },
                ...topics.map(topic => ({
                  name: topic.name,
                  value: topic.slug
                }))
              ]}
            />
          </Grid>
        </Grid>
        <Grid container className={classes.cardsContainer} spacing={2}>
          {children}
        </Grid>
      </Layout>
    </div>
  );
}

PromisesSection.propTypes = {
  children: propTypes.children.isRequired,
  showIndicator: propTypes.bool,
  filter: propTypes.shape({
    status: propTypes.string,
    term: propTypes.string,
    topic: propTypes.string
  })
};

PromisesSection.defaultProps = {
  showIndicator: false,
  filter: {
    status: undefined,
    term: undefined,
    topic: undefined
  }
};

export default PromisesSection;
