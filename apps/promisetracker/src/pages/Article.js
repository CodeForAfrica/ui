import React from 'react';

import { Redirect } from 'react-router-dom';

import { Grid, makeStyles } from '@material-ui/core';

import propTypes from '../components/propTypes';
import Layout from '../components/Layout';
import Page from '../components/Page';

import data from '../data/articles';

import Header from '../components/Articles/Header';
import Content from '../components/Articles/Content';
import SocialMedia from '../components/Articles/SocialMedia';
import Nav from '../components/Articles/Nav';
import Sidebar from '../components/Articles/Sidebar';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '8rem 0'
  },
  articleGrid: {
    borderRight: 0,
    [theme.breakpoints.up('md')]: {
      borderRight: `1px solid ${theme.palette.divider}`
    }
  }
}));

function Article({
  match: {
    params: { slug }
  }
}) {
  const classes = useStyles();

  const index = data.articles.findIndex(article => article.slug === slug);
  if (index === -1) {
    return <Redirect to={`/404/?${window.location.pathname}`} />;
  }

  const article = data.articles[index];
  // Lets use null to ensure the nothing is rendered: undefined seems to
  // render `0`
  const prevArticle = index ? data.articles[index - 1] : null;
  const nextArticle =
    index < data.articles.length - 1 && data.articles[index + 1];

  const previous = prevArticle && {
    href: `/articles/${prevArticle.slug}`,
    label: prevArticle.title
  };
  const next = nextArticle && {
    href: `/articles/${nextArticle.slug}`,
    label: nextArticle.title
  };

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
              title={article.title}
              subtitle={article.subtitle}
              mediaSrc={article.mediaSrc}
            />
            <SocialMedia />
            <Content
              first={article.content.first}
              middle={article.content.middle}
              end={article.content.end}
            />

            <Grid item>
              <Nav previous={previous} next={next} />
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Sidebar />
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
