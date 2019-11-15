import React, { useState } from 'react';

import {
  Typography,
  FormControl,
  FormLabel,
  TextField,
  Button,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles({
  contributeForm: {
    width: '100%',
    padding: '2rem'
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
        <TextField multiline id="description" />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <FormLabel htmlFor="source">Source</FormLabel>
        <TextField id="source" />
      </FormControl>
      <FormControl margin="normal">
        <Button variant="contained" color="primary" type="submit">
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
