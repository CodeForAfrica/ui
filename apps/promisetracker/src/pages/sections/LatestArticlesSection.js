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
        {config.articles.slice(0, articleSize).map(article => (
          <ArticleCardListItem
            square
            width={article[0] === 0 ? '40%' : '60%'}
            key={article.id}
          >
            <ArticleCard
              squares
              subtitle={article.subtitle}
              mediaSrc={article.mediaSrc}
              title={article.title}
              date={article.date}
            />
          </ArticleCardListItem>
        ))}
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
