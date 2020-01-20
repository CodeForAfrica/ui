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

import Validate from './Validate';

const useStyles = makeStyles({
  contributeForm: {
    width: '100%',
    padding: '2rem'
  }
});

function Form() {
  const classes = useStyles();

  function submit() {
    return <Typography> Thank you for your submission!</Typography>;
  }
  const { values, response, handleChange, handleSubmit } = useForm(
    submit,
    Validate
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
        {response.description && <p>{response.description}</p>}
      </FormControl>
      <FormControl fullWidth margin="normal">
        <FormLabel htmlFor="source">Source</FormLabel>
        <TextField
          id="source"
          name="source"
          value={values.source}
          onChange={handleChange}
        />
        {response.source && <p>{response.source}</p>}
      </FormControl>
      <FormControl margin="normal">
        <Button
          variant="contained"
          color="primary"
          type="submit"
          value="submit"
          name="submit"
        >
          Submit
        </Button>
      </FormControl>
      <FormControl fullWidth>
        {response.submit && <Typography>{submit()}</Typography>}
      </FormControl>
    </form>
  );
}

export default Form;
