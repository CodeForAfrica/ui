import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

import Layout from '../Layout';
import Page from '../Page';
import Article from './Article';
import ArticleSideBar from './ArticleSideBar';

const useStyles = makeStyles({
  root: {
    padding: '4rem 0'
  }
});

function ArticlePage() {
  const classes = useStyles();
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
          <Article />
          <ArticleSideBar />
        </Grid>
      </Layout>
    </Page>
  );
}

export default ArticlePage;
