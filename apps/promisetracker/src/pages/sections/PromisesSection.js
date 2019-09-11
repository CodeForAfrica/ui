import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import Layout from '../../components/Layout';
import Select from '../../components/Select';

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
  root: {
    background: 'rgb(246, 246, 246)',
    padding: '2rem 0rem 4.125rem'
  }
});

function PromisesSection() {
  const classes = useStyles();
  const [filter, setFilter] = useState({
    status: 'all',
    term: 'all',
    topic: 'all'
  });
  return (
    <div className={classes.root}>
      <Layout>
        <Grid
          item
          container
          justify="flex-start"
          spacing={1}
          style={{ maxWidth: '600px' }}
        >
          <Grid item xs={6} sm={4}>
            <Select
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
      </Layout>
    </div>
  );
}

export default PromisesSection;
