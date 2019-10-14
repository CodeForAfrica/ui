import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import Layout from '../Layout';

import Content from '../Contribute/Content';
import Form from '../Contribute/Form';

const useStyles = makeStyles({
  root: {
    padding: '2.5rem 0'
  },
  typoGrid: {
    padding: '2rem',
    background: '#f7b801'
  },
  formGrid: {
    background: '#f6f6f6'
  }
});

function Sidebar() {
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
            title="Contibute"
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

export default Sidebar;
