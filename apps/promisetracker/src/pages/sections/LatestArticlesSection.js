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
    <Grid container>
      <Layout justify="center">
        <Grid item xs={12}>
          <Typography className={classes.sectionTitle} variant="h2">
            Latest Articles
          </Typography>
          <Divider />
        </Grid>

        <Grid item>
          <ArticleCardList>
            <ArticleCardListItem square width="40%">
              {config.articles[0] ? (
                <ArticleCard
                  square
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
    </Grid>
  );
}

export default LatestArticlesSection;
