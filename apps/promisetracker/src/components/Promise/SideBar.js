import React from 'react';

import { Grid, makeStyles } from '@material-ui/core';

import Layout from 'components/Layout';
import Content from 'components/Contribute/Content';
import Form from 'components/Contribute/Form';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2.5rem 0',
    marginRight: '1rem'
  },
  typoGrid: {
    padding: '2rem',
    background: theme.palette.primary.main
  },
  formGrid: {
    background: theme.palette.grey[200]
  }
}));

function SideBar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Layout justify="center" alignItems="center">
        <Grid
          item
          xs={12}
          spacing={3}
          container
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
          className={classes.typoGrid}
        >
          <Content
            title="Contribute"
            subtitle="Have you spotted a promise in action?"
          />
        </Grid>
        <Grid container item xs={12} className={classes.formGrid}>
          <Form />
        </Grid>
      </Layout>
    </div>
  );
}

export default SideBar;
