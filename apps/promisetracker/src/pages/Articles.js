import React, { useMemo } from 'react';

import { Button, Grid, withWidth } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import propTypes from '../components/propTypes';

import Page from '../components/Page';
import Layout from '../components/Layout';
import ArticleCard from '../components/Articles/Cards/ArticleCard';
import ColumnArticleCard from '../components/Articles/Cards/ColumnArticleCard';
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

function Articles({ location: { search } }) {
  const classes = useStyles();
  const params = new URLSearchParams(search);
  const offsetParam = params.get('offset');
  const offset = useMemo(() => Number(offsetParam) || 0, [offsetParam]);
  const [articles] = useFetchArticles(config.url.articles);

  return (
    <Page>
      <Layout justify="center" classes={{ root: classes.root }}>
        <Grid container className={classes.mainGrid} spacing={5}>
          {!offset && (
            <div>
              {articles[0] ? (
                <ColumnArticleCard
                  uniqueSlug={articles[0].uniqueSlug}
                  subtitle={articles[0].virtuals.tags.map(
                    tag => `${tag.name} , `
                  )}
                  mediaSrc={`https://cdn-images-1.medium.com/max/2600/${articles[0].virtuals.previewImage.imageId}`}
                  title={articles[0].title}
                  date={articles[0].createdAt}
                  description={articles[0].content.subtitle}
                />
              ) : (
                <null />
              )}
            </div>
          )}
          <Grid
            container
            direction="row"
            spacing={4}
            className={classes.rowGrid}
          >
            {articles.slice(1).map(article => (
              <Grid item xs={12} sm={6} md={4} className={classes.articleGrid}>
                <ArticleCard
                  uniqueSlug={article.uniqueSlug}
                  subtitle={article.virtuals.tags.map(tag => `${tag.name} , `)}
                  mediaSrc={`https://cdn-images-1.medium.com/max/2600/${article.virtuals.previewImage.imageId}`}
                  title={article.title}
                  date={article.createdAt}
                />
              </Grid>
            ))}
          </Grid>

          <Grid item xs={12} className={classes.button}>
            <a
              href="https://pesacheck.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button color="primary" variant="contained">
                READ MORE
              </Button>
            </a>
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
