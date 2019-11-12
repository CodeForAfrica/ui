import React from 'react';

import { makeStyles, Typography, Button, Grid } from '@material-ui/core';


import Layout from '../Layout';
import ArticleCard from '../Article/ArticleCard';
import useFetchArticles from '../UseFetchArticles';

import config from '../../config';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2rem 0',
    background: theme.palette.background.paper
  },
  sectionTitle: {
    margin: '0rem 0.5rem',
    padding: '1rem 0.5rem',
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  mainGrid: {
    padding: '1rem 0'
  },

  button: { paddingTop: '3rem' }
}));

function LatestReportsSection() {
  const [articles] = useFetchArticles(config.url.articles);
  const classes = useStyles();

  return (
    <Layout justify="center" classes={{ root: classes.root }}>
      <Grid item xs={12} className={classes.sectionTitle}>
        <Typography variant="h4">Latest Reports</Typography>
      </Grid>

      <Grid container direction="row" className={classes.mainGrid}>
        {articles.map(article => (
          <ArticleCard
            uniqueSlug={article.uniqueSlug}
            subtitle={article.virtuals.tags.map(
              (tag, index) => (index ? ', ' : '') + tag.name
            )}
            image={`https://cdn-images-1.medium.com/max/2600/${article.virtuals.previewImage.imageId}`}
            title={article.title}
            date={article.createdAt}
          />
        ))}
      </Grid>
      <Grid item className={classes.button}>
        <Button
          classes={{ root: classes.readMore }}
          color="primary"
          variant="contained"
          href="https://pesacheck.org/tagged/promise-tracker"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read more Reports
        </Button>
      </Grid>
    </Layout>
  );
}

export default LatestReportsSection;
