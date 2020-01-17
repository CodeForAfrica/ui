import React from 'react';

import {
  Typography,
  FormControl,
  FormLabel,
  TextField,
  Button,
  makeStyles
} from '@material-ui/core';
import useForm from './useForm';

import ValidateErrors from './ValidateErrors';

const useStyles = makeStyles({
  contributeForm: {
    width: '100%',
    padding: '2rem'
  }
});

function Form() {
  const classes = useStyles();
  // const { values, handleChange, handleSubmit } = useForm(submit);
  function submit() {
    return <Typography> Thank you for your submission!</Typography>;
  }
  const { values, errors, handleChange, handleSubmit } = useForm(
    submit,
    ValidateErrors
  );

  return (
    <form className={classes.contributeForm} onSubmit={handleSubmit}>
      <FormControl fullWidth margin="normal">
        <FormLabel htmlFor="description">Description</FormLabel>
        <TextField
          multiline
          id="description"
          name="description"
          value={values.description}
          onChange={handleChange}
        />
        {errors.description && <p>{errors.description}</p>}
      </FormControl>
      <FormControl fullWidth margin="normal">
        <FormLabel htmlFor="source">Source</FormLabel>
        <TextField
          id="source"
          name="source"
          value={values.source}
          onChange={handleChange}
        />
        {errors.source && <p>{errors.source}</p>}
      </FormControl>
      <FormControl margin="normal">
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </FormControl>
      <FormControl fullWidth>{handleSubmit && submit()}</FormControl>
    </form>
  );
}

export default Form;
