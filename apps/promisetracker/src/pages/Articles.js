import React, { useMemo } from 'react';

import { Button, Grid, withWidth } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import propTypes from '../components/propTypes';

import Page from '../components/Page';

import Layout from '../components/Layout';
import ArticleCardList from '../components/Articles/Cards/ArticleCardList';
import ArticleCardListItem from '../components/Articles/Cards/ArticleCardListItem';

import ArticleCard from '../components/Articles/Cards/ArticleCard';
import ColumnArticleCard from '../components/Articles/Cards/ColumnArticleCard';

import RouterLink from '../components/RouterLink';

import data from '../data/articles';

const useStyles = makeStyles({
  readMore: {
    margin: '3rem 0'
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
        <Grid container style={{ padding: '5rem 0' }} spacing={5}>
          <ArticleCardList>
            {!articles.offset && (
              <ArticleCardListItem>
                {articles.data[0] ? (
                  <ColumnArticleCard
                    slug={articles.data[0].slug}
                    subtitle={articles.data[0].subtitle}
                    mediaSrc={articles.data[0].mediaSrc}
                    title={articles.data[0].title}
                    date={articles.data[0].date}
                    description="August 2019 marks the sixth anniversary of Hassan Rouhani’s presidency. His sixth year in office was a difficult one, both for him and for the people of Iran. The economic and political crises that began earlier seem to continue into his seventh year. "
                  />
                ) : (
                  <null />
                )}
              </ArticleCardListItem>
            )}
            <Grid
              container
              direction="row"
              spacing={4}
              style={{ padding: '3rem 0' }}
            >
              {data.articles.slice(2).map(article => (
                <Grid item xs={12} sm={6} md={4} className={classes.rowGrid}>
                  <ArticleCardListItem>
                    <ArticleCard
                      slug={article.slug}
                      subtitle={article.subtitle}
                      mediaSrc={article.mediaSrc}
                      title={article.title}
                      date={article.date}
                    />
                  </ArticleCardListItem>
                </Grid>
              ))}
            </Grid>
          </ArticleCardList>

          <Grid item xs={12} style={{ textAlign: 'center' }}>
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
