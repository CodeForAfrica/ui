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
  const [description, setDescription] = useState('');
  const [source, setSource] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    // console.log('set description and source', { source }, { description });
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
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <FormLabel htmlFor="source">Source</FormLabel>
        <TextField
          id="source"
          value={source}
          onChange={e => setSource(e.target.value)}
        />
      </FormControl>
      <FormControl margin="normal">
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </FormControl>
      {submitted && (
        <FormControl fullWidth>
          <Typography> Thank you for your submission!</Typography>
        </FormControl>
      )}
    </form>
  );
}

export default Form;
