import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

import propTypes from '../components/propTypes';
import Layout from '../components/Layout';
import Page from '../components/Page';

import data from '../data/articles';

import Header from '../components/Articles/Header';
import Content from '../components/Articles/Content';
import ContentSocialMedia from '../components/Articles/ContentSocialMedia';
import Contribute from '../components/Articles/Contribute';
import Nav from '../components/Articles/Nav';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '4rem 0'
  },
  articleGrid: {
    borderRight: 0,
    [theme.breakpoints.up('md')]: {
      borderRight: '1px solid #e6e6e6'
    }
  }
}));

function Article({
  match: {
    params: { slug }
  }
}) {
  const classes = useStyles();

  const getItems = data.articles.find(article => article.slug === slug);
  const index = data.articles.findIndex(article => article.slug === slug);
  if (index === -1) {
    return null;
  }
  // const article = data.articles[index];
  const prevArticle = index && data.articles[index - 1];
  const nextArticle =
    index < data.articles.length - 1 && data.articles[index + 1];

  const prev = `articles/${prevArticle.slug}`;
  const prevLabel = `${prevArticle.title}`;
  const next = `articles/${nextArticle.slug}`;
  const nextLabel = `${nextArticle.title}`;

  return (
    <Page>
      <Layout>
        <Grid
          container
          spacing={10}
          direction="row"
          justify="center"
          alignItems="flex-start"
          className={classes.root}
        >
          <Grid item xs={12} md={8} spacing={8} className={classes.articleGrid}>
            <Header
              title={getItems.title}
              subtitle={getItems.subtitle}
              mediaSrc={getItems.mediaSrc}
            />
            <ContentSocialMedia />
            <Content
              first={getItems.content.first}
              middle={getItems.content.middle}
              end={getItems.content.end}
            />

            <Grid item>
              <Nav
                previous={{
                  href: { prev },
                  label: prevLabel
                }}
                next={{
                  href: { next },
                  label: nextLabel
                }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Contribute />
          </Grid>
        </Grid>
      </Layout>
    </Page>
  );
}

Article.propTypes = {
  match: propTypes.match.isRequired
};

export default Article;
