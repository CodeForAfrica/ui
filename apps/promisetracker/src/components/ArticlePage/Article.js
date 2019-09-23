import React from 'react';

import { Grid, makeStyles } from '@material-ui/core';

import ArticleHeaderSection from './ArticleSections/ArticleHeaderSection';
import ArticleBodyCopy from './ArticleSections/ArticleBodyCopy';
import ArticleSocialMedia from './ArticleSections/ArticleSocialMedia';

const useStyles = makeStyles({
  root: {
    borderRight: '1px solid #e6e6e6'
  },
  img: {
    maxWidth: '100%',
    height: 'auto'
  }
});

function Article() {
  const classes = useStyles();
  return (
    <Grid item xs={12} md={8} spacing={8} className={classes.root}>
      <ArticleHeaderSection />
      <ArticleSocialMedia />
      <ArticleBodyCopy />
    </Grid>
  );
}

export default Article;
