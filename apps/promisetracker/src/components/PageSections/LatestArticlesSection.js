import React from 'react';

import { Typography, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Layout from 'components/Layout';
import ReportCard from 'components/ReportCard';
import fetchReports from 'lib/fetchReports';

import config from 'config';

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
  const [reports] = fetchReports(config.reports.url);
  const classes = useStyles();

  return (
    <Layout justify="center" classes={{ root: classes.root }}>
      <Grid item xs={12} className={classes.sectionTitle}>
        <Typography variant="h4">Latest Articles</Typography>
      </Grid>

      <Grid item xs={12} container direction="row" className={classes.mainGrid}>
        {reports.map(report => (
          <ReportCard
            key={report.uniqueSlug}
            uniqueSlug={report.uniqueSlug}
            subtitle={report.virtuals.tags.map(tag => tag.name).join(', ')}
            image={`https://cdn-images-1.medium.com/max/2600/${report.virtuals.previewImage.imageId}`}
            title={report.title}
            date={report.createdAt}
          />
        ))}
      </Grid>
      <Grid item className={classes.button}>
        <Button
          classes={{ root: classes.readMore }}
          color="primary"
          variant="contained"
          href={config.reports.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read more Articles
        </Button>
      </Grid>
    </Layout>
  );
}

export default LatestReportsSection;
