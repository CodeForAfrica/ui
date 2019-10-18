import React, { useMemo } from 'react';

import { Button, Grid, withWidth } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import propTypes from '../components/propTypes';

import Page from '../components/Page';

import Layout from '../components/Layout';

import ArticleCard from '../components/Articles/Cards/ArticleCard';
import ColumnArticleCard from '../components/Articles/Cards/ColumnArticleCard';

import RouterLink from '../components/RouterLink';

import data from '../data/articles';

const useStyles = makeStyles({
  readMore: {
    margin: '3rem 0'
  },
  mainGrid: { padding: '5rem 0' },
  rowGrid: {
    padding: '3rem 0'
  },
  button: {
    textAlign: 'center'
  }
});

function Articles({ location: { search } }) {
  const classes = useStyles();
  const params = new URLSearchParams(search);
  const offsetParam = params.get('offset');
  const offset = useMemo(() => Number(offsetParam) || 0, [offsetParam]);
  const articles = {
    offset,
    data: data.articles
  };

  return (
    <Page>
      <Layout justify="center">
        <Grid container className={classes.mainGrid} spacing={5}>
          {!articles.offset && (
            <li>
              {articles.data[0] ? (
                <ColumnArticleCard
                  slug={articles.data[0].slug}
                  subtitle={articles.data[0].subtitle}
                  mediaSrc={articles.data[0].mediaSrc}
                  title={articles.data[0].title}
                  date={articles.data[0].date}
                  description="August 2019 marks the sixth anniversary of Hassan Rouhani’s presidency. 
                              His sixth year in office was a difficult one, both for him and for the people of Iran. 
                              The economic and political crises that began earlier seem to continue into his seventh year. "
                />
              ) : (
                <null />
              )}
            </li>
          )}
          <Grid
            container
            direction="row"
            spacing={4}
            className={classes.rowGrid}
          >
            {data.articles.slice(2).map(article => (
              <Grid item xs={12} sm={6} md={4} className={classes.rowGrid}>
                <ArticleCard
                  slug={article.slug}
                  subtitle={article.subtitle}
                  mediaSrc={article.mediaSrc}
                  title={article.title}
                  date={article.date}
                />
              </Grid>
            ))}
          </Grid>

          <Grid item xs={12} className={classes.button}>
            <Button
              component={RouterLink}
              to={`/articles?offset=${offset + 1}`}
              color="primary"
              variant="contained"
            >
              READ MORE
            </Button>
          </Grid>
        </Grid>
      </Layout>
    </Page>
  );
}

Articles.propTypes = {
  location: propTypes.shape({
    search: propTypes.string
  }).isRequired
};

export default withWidth()(Articles);
