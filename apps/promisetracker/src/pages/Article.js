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
                  href:
                    '/articles/rouhani-meter-visual-qualitative-analysis-report',
                  label: 'Rouhani Meter Visual Qualitative Analysis Report.'
                }}
                next={{
                  href:
                    '/articles/was-tehran-deputy-governor-fired-for-negligence',
                  label: 'Was Tehran’s Deputy Governor Fired for Negligence'
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
