import React from 'react';
import { makeStyles, Typography, Button, Grid } from '@material-ui/core';
import Layout from '../../components/Layout';

import ArticleCard from '../../components/Articles/Cards/ArticleCard';
import ArticleCardList from '../../components/Articles/Cards/ArticleCardList';
import ArticleCardListItem from '../../components/Articles/Cards/ArticleCardListItem';

import RouterLink from '../../components/RouterLink';

import data from '../../data/articles';

const useStyles = makeStyles({
  sectionTitle: {
    padding: '2rem 0'
  },
  readMore: {
    margin: '1rem 0'
  }
});

const articleSize = 4;

function LatestArticlesSection() {
  const classes = useStyles();
  return (
    <Layout justify="center">
      <Grid item xs={12}>
        <Typography variant="h4">Latest Articles</Typography>
      </Grid>

      <Grid item>
        <ArticleCardList>
          <ArticleCardListItem square width="40%">
            {data.articles[0] ? (
              <ArticleCard
                square
                slug={data.articles[0].slug}
                subtitle={data.articles[0].subtitle}
                mediaSrc={data.articles[0].mediaSrc}
                title={data.articles[0].title}
                date={data.articles[0].date}
              />
            ) : (
              <null />
            )}
          </ArticleCardListItem>
          <ArticleCardListItem square width="60%">
            {data.articles.slice(1, articleSize).map(article => (
              <ArticleCard
                squares
                slug={article.slug}
                subtitle={article.subtitle}
                mediaSrc={article.mediaSrc}
                title={article.title}
                date={article.date}
              />
            ))}
          </ArticleCardListItem>
        </ArticleCardList>
      </Grid>

      <Button
        classes={{ root: classes.readMore }}
        component={RouterLink}
        to="/articles"
        color="primary"
      >
        READ MORE
      </Button>
    </Layout>
  );
}

export default LatestArticlesSection;
