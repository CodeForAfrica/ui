import React from 'react';
import { makeStyles, Typography, Button, Grid } from '@material-ui/core';
import Layout from '../../components/Layout';

import ArticleCard from '../../components/Articles/Cards/ArticleCard';
import ColumnArticleCard from '../../components/Articles/Cards/ColumnArticleCard';
import useFetchArticles from '../../components/UseFetchArticles';

import config from '../../config';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '4rem 0',
    background: theme.palette.background.paper
  },
  sectionTitle: {
    padding: '2rem 0'
  },
  mainGrid: {
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: '1.5rem 0'
  },
  columnGrid: {
    borderLeft: `1px solid ${theme.palette.divider}`
  },
  button: { paddingTop: '3rem' }
}));

const articleSize = 4;

function LatestArticlesSection() {
  const [articles] = useFetchArticles(config.url.articles);
  const classes = useStyles();

  return (
    <Layout justify="center" classes={{ root: classes.root }}>
      <Grid item xs={12} className={classes.sectionTitle}>
        <Typography variant="h4">Latest Articles</Typography>
      </Grid>
      <Grid container direction="row" className={classes.mainGrid}>
        <Grid item xs={12} md={5}>
          {articles[0] ? (
            <ArticleCard
              uniqueSlug={articles[0].uniqueSlug}
              subtitle={articles[0].virtuals.tags.map(
                (tag, index) => (index ? ', ' : '') + tag.name
              )}
              mediaSrc={`https://cdn-images-1.medium.com/max/2600/${articles[0].virtuals.previewImage.imageId}`}
              title={articles[0].title}
              date={articles[0].createdAt}
            />
          ) : (
            <null />
          )}
        </Grid>

        <Grid item xs={12} md={7} className={classes.columnGrid}>
          {articles.slice(1, articleSize).map(article => (
            <ColumnArticleCard
              uniqueSlug={article.uniqueSlug}
              subtitle={article.virtuals.tags.map(
                (tag, index) => (index ? ', ' : '') + tag.name
              )}
              mediaSrc={`https://cdn-images-1.medium.com/max/2600/${article.virtuals.previewImage.imageId}`}
              title={article.title}
              date={article.createdAt}
            />
          ))}
        </Grid>
      </Grid>

      <Grid item className={classes.button}>
        <Button
          classes={{ root: classes.readMore }}
          color="primary"
          variant="contained"
          href="https://pesacheck.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          READ MORE
        </Button>
      </Grid>
    </Layout>
  );
}

export default LatestArticlesSection;
