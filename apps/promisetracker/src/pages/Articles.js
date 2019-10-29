import React from 'react';

import { Button, Grid, withWidth } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import propTypes from '../components/propTypes';

import Page from '../components/Page';
import Layout from '../components/Layout';
import ArticleCard from '../components/Articles/Card/ArticleCard';
import useFetchArticles from '../components/UseFetchArticles';

import config from '../config';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.background.paper
  },
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
}));

function Articles() {
  const classes = useStyles();
  const [articles] = useFetchArticles(config.url.articles);
  return (
    <Page>
      <Layout justify="center" classes={{ root: classes.root }}>
        <Grid
          container
          direction="row"
          className={classes.mainGrid}
          spacing={5}
        >
          <Grid
            container
            direction="row"
            spacing={4}
            className={classes.rowGrid}
          >
            {articles.map(article => (
              <ArticleCard
                uniqueSlug={article.uniqueSlug}
                subtitle={article.virtuals.tags.map(
                  (tag, index) => (index ? ', ' : '') + tag.name
                )}
                image={`https://cdn-images-1.medium.com/max/2600/${article.virtuals.previewImage.imageId}`}
                title={article.title}
                date={article.createdAt}
                description={article.content.subtitle}
              />
            ))}
          </Grid>

          <Grid item xs={12} className={classes.button}>
            <Button
              color="primary"
              variant="contained"
              href="https://pesacheck.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              READ MORE ARTICLES
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
