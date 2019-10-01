import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Typography,
  FormControl,
  FormLabel,
  TextField,
  Button
} from '@material-ui/core';

import Layout from '../../Layout';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2.5rem 0'
  },
  contributeMainGrid: {
    [theme.breakpoints.up('md')]: {
      height: 'auto',
      maxWidth: '100%'
    }
  },
  typoGrid: {
    padding: '0.8rem',
    background: '#f7b801'
  },
  formGrid: {
    background: '#f6f6f6',
    padding: '0.5rem'
  },
  contributeForm: {
    margin: 0,
    [theme.breakpoints.up('md')]: {
      margin: '2rem'
    }
  },
  textField: { height: '8.375rem' },
  submitButton: {
    '&:hover': {
      color: 'white',
      border: '0.0625rem solid #f7b801',
      backgroundColor: '#f7b801',
      fontWeight: 'bold',
      boxShadow: '0 0.125rem 0.125rem 0.0625rem rgba(0,0,0,.1)'
    }
  }
}));

function Contribute() {
  const classes = useStyles();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();

    setSubmitted(true);
    setInterval(() => {
      setSubmitted(false);
    }, 4000);
  };
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
          <Grid item>
            <Typography variant="h2">Contibute</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h3">
              Have you spotted a promise in action?
            </Typography>
          </Grid>
        </Grid>

        <Grid container item xs={12} className={classes.formGrid}>
          <form onSubmit={handleSubmit} className={classes.contributeForm}>
            <FormControl fullWidth margin="normal">
              <FormLabel htmlFor="description">Description</FormLabel>
              <TextField
                multiline
                id="description"
                className={classes.textField}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <FormLabel htmlFor="source">Source</FormLabel>
              <TextField id="source" />
            </FormControl>
            <FormControl margin="normal">
              <Button className={classes.submitButton} type="submit">
                Submit
              </Button>
            </FormControl>
            {submitted && (
              <FormControl fullWidth>
                <Typography>Thank you for your submission!</Typography>
              </FormControl>
            )}
          </form>
        </Grid>
      </Layout>
    </div>
  );
}

export default Contribute;
