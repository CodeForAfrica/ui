import React, { useMemo } from 'react';

import { Button, Grid, withWidth } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import propTypes from '../components/propTypes';

import Page from '../components/Page';

import Layout from '../components/Layout';

import ArticleCard from '../components/Articles/Cards/ArticleCard';
import ColumnArticleCard from '../components/Articles/Cards/ColumnArticleCard';

import RouterLink from '../components/RouterLink';
import useFetchArticles from '../components/Hook';

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

  const [articles] = useFetchArticles(
    'https://stories.hurumap.org/@PesaCheck/latest'
  );
  return (
    <Page>
      <Layout justify="center" classes={{ root: classes.root }}>
        <Grid container className={classes.mainGrid} spacing={5}>
          {!offset && (
            <div>
              {articles[0] ? (
                <ColumnArticleCard
                  uniqueSlug={articles[0].uniqueSlug}
                  subtitle={articles[0].virtuals.tags[0].name}
                  mediaSrc={`https://cdn-images-1.medium.com/max/2600/${articles[0].virtuals.previewImage.imageId}`}
                  title={articles[0].title}
                  date={articles[0].createdAt}
                  description="August 2019 marks the sixth anniversary of Hassan Rouhani’s presidency. 
                              His sixth year in office was a difficult one, both for him and for the people of Iran. 
                              The economic and political crises that began earlier seem to continue into his seventh year. "
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
            {articles.slice(2).map(article => (
              <Grid item xs={12} sm={6} md={4} className={classes.rowGrid}>
                <ArticleCard
                  uniqueSlug={article.uniqueSlug}
                  subtitle={article.virtuals.tags[0].name}
                  mediaSrc={`https://cdn-images-1.medium.com/max/2600/${article.virtuals.previewImage.imageId}`}
                  title={article.title}
                  date={article.createdAt}
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
