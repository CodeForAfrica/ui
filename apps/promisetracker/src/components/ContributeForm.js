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

const useStyles = makeStyles({
  root: {
    overflow: 'hidden',
    borderRadius: '.25rem'
  },
  callToActionGrid: {
    background: '#f7b801',
    padding: '1rem'
  },
  contributeForm: {
    width: '100%',
    background: '#f6f6f6',
    padding: '1rem',
    '& .MuiInputBase-input': {
      color: '#637381'
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
});

function ContributeForm() {
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
    <Grid container className={classes.root}>
      <Grid
        item
        container
        spacing={2}
        wrap="nowrap"
        direction="column"
        className={classes.callToActionGrid}
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

      <Grid item xs={12}>
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
    </Grid>
  );
}

export default ContributeForm;
