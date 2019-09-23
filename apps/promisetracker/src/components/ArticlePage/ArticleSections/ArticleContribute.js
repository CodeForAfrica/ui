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

const useStyles = makeStyles({
  contributeFormGrid: {
    backgroundColor: 'grey'
  },
  descriptionTextField: {
    height: '8.375rem'
  },
  submitButton: {
    '&:hover': {
      color: 'white',
      border: '0.0625rem solid #f7b801',
      backgroundColor: '#f7b801',
      fontWeight: 'bold',
      boxShadow: '0 0.125rem 0.125rem 0.0625rem rgba(0,0,0,.1)'
    }
  }
});
function ArticleContribute() {
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
    <Grid className={classes.root}>
      <Layout direction="column" justify="center" alignItems="center">
        <Grid
          className={classes.contributeCallToAction}
          item
          xs={12}
          md={6}
          style={{ backgroundColor: '#f7b801' }}
        >
          <Typography variant="h2">Contibute</Typography>
          <Typography variant="h3">
            Have you spotted a promise in action?
          </Typography>
        </Grid>

        <Grid
          className={classes.contributeFormGrid}
          container
          item
          xs={12}
          md={6}
        >
          <form className={classes.contributeForm} onSubmit={handleSubmit}>
            <FormControl fullWidth>
              <FormLabel htmlFor="description">Description</FormLabel>
              <TextField
                multiline
                id="description"
                className={classes.descriptionTextField}
              />
            </FormControl>
            <FormControl fullWidth>
              <FormLabel htmlFor="source">Source</FormLabel>
              <TextField id="source" />
            </FormControl>
            <FormControl>
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
    </Grid>
  );
}

export default ArticleContribute;
