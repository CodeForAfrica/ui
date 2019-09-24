import React from 'react';
import {
  makeStyles,
  Typography,
  Divider,
  Button,
  Grid
} from '@material-ui/core';
import Layout from '../../components/Layout';

import ArticleCard from '../../components/Articles/Cards/ArticleCard';
import ArticleCardList from '../../components/Articles/Cards/ArticleCardList';
import ArticleCardListItem from '../../components/Articles/Cards/ArticleCardListItem';

import RouterLink from '../../components/RouterLink';

const useStyles = makeStyles({
  root: {
    padding: '1rem'
  },
  sectionTitle: {
    padding: '.5rem 0'
  },
  readMore: {
    margin: '1rem 0'
  }
});

function LatestArticlesSection() {
  const classes = useStyles();
  return (
    <Layout classes={{ root: classes.root }} justify="center">
      <Grid item xs={12}>
        <Typography className={classes.sectionTitle} variant="h2">
          Latest Articles
        </Typography>
        <Divider />
      </Grid>

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

      <Button
        classes={{ root: classes.readMore }}
        component={RouterLink}
        to="/articles"
        color="primary"
      >
        READ MORE
      </Button>
    </Layout>
  );
}

export default LatestArticlesSection;
