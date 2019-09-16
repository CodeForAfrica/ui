import React from 'react';
import { makeStyles, Typography, Divider } from '@material-ui/core';
import Layout from '../../components/Layout';
import ArticleCard from '../../components/ArticleCard';
import ArticleCardList from '../../components/ArticleCardList';
import ArticleCardItem from '../../components/ArticleCardItem';

const useStyles = makeStyles({
  root: {
    height: '677px',
    padding: '1rem'
  },
  sectionTitle: {
    padding: '.5rem 0'
  }
});

function LatestArticlesSection() {
  const classes = useStyles();
  return (
    <Layout classes={{ root: classes.root }}>
      <Typography className={classes.sectionTitle} variant="h2">
        Latest Articles
      </Typography>
      <Divider />

      <ArticleCardList>
        <ArticleCardItem square width="40%">
          <ArticleCard
            square
            title="Promise Tracker Annual Report (Executive Summary)"
          />
        </ArticleCardItem>
        <ArticleCardItem width="60%">
          <ArticleCard title="Promise Tracker Annual Report (Executive Summary)" />
        </ArticleCardItem>
        <ArticleCardItem width="60%">
          <ArticleCard title="Promise Tracker Annual Report (Executive Summary)" />
        </ArticleCardItem>
        <ArticleCardItem width="60%">
          <ArticleCard title="Promise Tracker Annual Report (Executive Summary)" />
        </ArticleCardItem>
      </ArticleCardList>
    </Layout>
  );
}

export default LatestArticlesSection;
