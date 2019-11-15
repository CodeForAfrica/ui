import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

import Layout from 'components/Layout';
import Content from 'components/Contribute/Content';
import Form from 'components/Contribute/Form';

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.up('md')]: {
      height: '28.375rem',
      background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.main} 50%, ${theme.palette.grey[200]} 50%, ${theme.palette.grey[200]})`
    }
  },
  contributeCallToAction: {
    background: theme.palette.primary.main,
    padding: theme.spacing(4)
  },
  contributeFormGrid: {
    backgroundColor: theme.palette.grey[200]
  }
}));

function ContributeSection() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Layout justify="center" alignItems="center">
        <Grid className={classes.contributeCallToAction} item xs={12} md={6}>
          <Content
            title="Contribute"
            subtitle="Have you spotted a promise in action?"
            description="See something wrong? Share data to help assess a promise!"
          />
        </Grid>
        <Grid
          className={classes.contributeFormGrid}
          container
          item
          xs={12}
          md={6}
        >
          <Form />
        </Grid>
      </Layout>
    </div>
  );
}

export default ContributeSection;
