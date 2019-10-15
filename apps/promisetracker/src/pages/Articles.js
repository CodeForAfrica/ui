import React from 'react';

import { Button, withWidth, Grid } from '@material-ui/core';
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
  root: {},
  readMore: {
    margin: '3rem 0'
  }
});

function Articles() {
  const classes = useStyles();
  const articles = {
    data: data.articles
  };
  return (
    <Page>
      <Layout justify="center">
        <Grid container style={{ padding: '5rem 0' }}>
          <ArticleCardList>
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
            <Grid container direction="row" spacing={4}>
              {data.articles.slice(2).map(article => (
                <Grid
                  item
                  xs={4}
                  style={{
                    borderLeft: '1px solid grey',
                    borderRight: '1px solid grey'
                  }}
                >
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

          <Button
            classes={{ root: classes.readMore }}
            component={RouterLink}
            // to={`/articles?offset=${offset + 1}`}
            color="primary"
          >
            READ MORE
          </Button>
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
