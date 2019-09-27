import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

import Layout from '../../Layout';
import Page from '../../Page';

import ArticleHeaderSection from './ArticleSections/ArticleHeaderSection';
import ArticleBodyCopy from './ArticleSections/ArticleBodyCopy';
import ArticleSocialMedia from './ArticleSections/ArticleSocialMedia';
import ArticleContribute from './ArticleSections/ArticleContribute';
import ArticleNav from './ArticleSections/ArticleNav';
import config from '../../articles';

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

const pageURL = window.location.href;
const lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);

function ArticlePage() {
  const classes = useStyles();
  const getItems = config.articles.find(
    article => article.slug === lastURLSegment
  );
  console.log(getItems);
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
            <ArticleHeaderSection
              title={getItems.title}
              subtitle={getItems.subtitle}
              mediaSrc={getItems.mediaSrc}
            />
            <ArticleSocialMedia />
            <ArticleBodyCopy content={getItems.content} />
            <Grid item>
              <ArticleNav
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
            <ArticleContribute />
          </Grid>
        </Grid>
      </Layout>
    </Page>
  );
}

export default ArticlePage;
