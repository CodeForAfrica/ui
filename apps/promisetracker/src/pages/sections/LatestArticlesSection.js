import React from 'react';
import {
  makeStyles,
  Typography,
  Divider,
  Button,
  Grid
} from '@material-ui/core';
import Layout from '../../components/Layout';

import ArticleCard from '../../components/Articles/Cards/ArticleCard';
import ArticleCardList from '../../components/Articles/Cards/ArticleCardList';
import ArticleCardListItem from '../../components/Articles/Cards/ArticleCardListItem';

import RouterLink from '../../components/RouterLink';

import config from '../../components/articles';

const useStyles = makeStyles({
  root: {
    padding: '1rem'
  },
  sectionTitle: {
    padding: '.5rem 0'
  },
  readMore: {
    margin: '1rem 0'
  }
});

const articleSize = 4;
console.log(config.articles[0]);

function LatestArticlesSection() {
  const classes = useStyles();
  return (
    <Layout classes={{ root: classes.root }} justify="center">
      <Grid item xs={12}>
        <Typography className={classes.sectionTitle} variant="h2">
          Latest Articles
        </Typography>
        <Divider />
      </Grid>

      <ArticleCardList>
        <ArticleCardListItem square width="40%">
          {config.articles[0] ? (
            <ArticleCard
              squares
              slug={config.articles[0].slug}
              subtitle={config.articles[0].subtitle}
              mediaSrc={config.articles[0].mediaSrc}
              title={config.articles[0].title}
              date={config.articles[0].date}
            />
          ) : (
            <null />
          )}
        </ArticleCardListItem>
        <ArticleCardListItem square width="60%">
          {config.articles.slice(1, articleSize).map(article => (
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
