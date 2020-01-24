import React from 'react';

import {
  FormControl,
  FormLabel,
  TextField,
  Button,
  makeStyles
} from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
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
  const { values, response, handleChange, handleSubmit } = useForm(Validate);

  return (
    <form className={classes.contributeForm} onSubmit={handleSubmit}>
      <FormControl fullWidth margin="normal">
        <FormLabel htmlFor="quote">What is the promise?</FormLabel>
        <TextField
          multiline
          id="quote"
          name="quote"
          type="text"
          value={values.quote}
          onChange={handleChange}
          helperText={response.quote && response.quote}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <FormLabel htmlFor="source">Sources</FormLabel>
        <TextField
          id="source"
          name="source"
          type="text"
          value={values.source}
          onChange={handleChange}
          helperText={response.source && response.source}
        />
        <br />
        <FormHelperText id="component-helper-text">
          Please state who made the promise,when and where. Include any
          supporting link if possible
        </FormHelperText>
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
        {response.submit && (
          <FormHelperText id="component-helper-text">
            {response.submit}
          </FormHelperText>
        )}
      </FormControl>
    </form>
  );
}

export default Form;
