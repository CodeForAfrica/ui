import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  FormControl,
  FormLabel,
  TextField,
  Button
} from '@material-ui/core';

const useStyles = makeStyles({
  contributeForm: {
    width: '100%',
    padding: '2rem'
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

function Form() {
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
    <form className={classes.contributeForm} onSubmit={handleSubmit}>
      <FormControl fullWidth margin="normal">
        <FormLabel htmlFor="description">Description</FormLabel>
        <TextField
          multiline
          id="description"
          className={classes.descriptionTextField}
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
  );
}

export default Form;
