import React from 'react';
import { makeStyles, Typography, Divider } from '@material-ui/core';
import Layout from '../../components/Layout';
import ArticleCard from '../../components/ArticleCard';
import ArticleCardList from '../../components/ArticleCardList';
import ArticleCardListItem from '../../components/ArticleCardListItem';

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
        <ArticleCardListItem square width="40%">
          <ArticleCard
            square
            imgSrc="https://rouhanimeter.com/rm-media/uploads/RM-report-2019-header-800x546-1-600x410.png"
            title="Promise Tracker Annual Report (Executive Summary)"
            date="2019-09-16T17:53:45.289Z"
          />
        </ArticleCardListItem>
        <ArticleCardListItem width="60%">
          <ArticleCard
            imgSrc="https://rouhanimeter.com/rm-media/uploads/RM-report-2019-header-800x546-1-600x410.png"
            title="Promise Tracker Annual Report (Executive Summary)"
            date="2019-09-16T17:53:45.289Z"
          />
        </ArticleCardListItem>
        <ArticleCardListItem width="60%">
          <ArticleCard
            imgSrc="https://rouhanimeter.com/rm-media/uploads/RM-report-2019-header-800x546-1-600x410.png"
            title="Promise Tracker Annual Report (Executive Summary)"
            date="2019-09-16T17:53:45.289Z"
          />
        </ArticleCardListItem>
        <ArticleCardListItem width="60%">
          <ArticleCard
            imgSrc="https://rouhanimeter.com/rm-media/uploads/RM-report-2019-header-800x546-1-600x410.png"
            title="Promise Tracker Annual Report (Executive Summary)"
            date="2019-09-16T17:53:45.289Z"
          />
        </ArticleCardListItem>
      </ArticleCardList>
    </Layout>
  );
}

export default LatestArticlesSection;
