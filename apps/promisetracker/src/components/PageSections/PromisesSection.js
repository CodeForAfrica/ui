import React, { useCallback } from 'react';

import { Grid, Button, makeStyles } from '@material-ui/core';

import { useRouter } from 'next/router';

import propTypes from 'components/propTypes';

import Layout from 'components/Layout';
import Select from 'components/Select';
import PromiseCard from 'components/Promise/Card';

import Link from 'components/Link';

import filterData from 'data';
import slugify from 'lib/slugify';

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

function PromisesSection({ promises, enableShowMore, filter, ...props }) {
  const classes = useStyles(props);
  const router = useRouter();

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

  const findStatus = statusParam => {
    return slugify(
      (
        statusParam.tasks.edges.find(
          ({ node: task }) =>
            task.label === 'What is the status of the promise?'
        ) || { node: { first_response_value: '' } }
      ).node.first_response_value
    );
  };
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

      {promises.map(({ id, project_medias: projectMedias }) => (
        <Grid
          item
          xs={12}
          container
          className={classes.cardsContainer}
          spacing={2}
          color="white"
          key={id}
        >
          {projectMedias.edges
            .filter(
              ({ node: filterMedia }) =>
                (!filter.status || findStatus(filterMedia) === filter.status) &&
                (!filter.term || filter.term === 'term-1') &&
                (!filter.topic ||
                  filterMedia.tags.edges
                    .map(({ node: topic }) => slugify(topic.tag_text))
                    .toString() === filter.topic)
            )
            .map(({ node: media }) => (
              <Grid key={media.id} item xs={12} sm={6} md={4}>
                <PromiseCard
                  href="promise/[dbid]/[id]"
                  as={`promise/${media.dbid}/${slugify(media.title)}`}
                  term={filterData.terms.find(s => s.slug === 'term-1').name}
                  title={media.title}
                  description={media.description}
                  topic={
                    (
                      filterData.topics.find(
                        s =>
                          s.slug ===
                          media.tags.edges
                            .map(({ node: topic }) => slugify(topic.tag_text))
                            .toString()
                      ) || {}
                    ).name
                  }
                  status={findStatus(media)}
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
