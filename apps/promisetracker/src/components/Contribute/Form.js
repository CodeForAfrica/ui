import React from 'react';

import { FormControl, TextField, Button, makeStyles } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';

import useForm from './useForm';

import validateForm from './validateForm';

const useStyles = makeStyles({
  contributeForm: {
    width: '100%',
    padding: '2rem'
  }
});

function Form() {
  const classes = useStyles();
  const { values, response, handleChange, handleSubmit } = useForm(
    validateForm
  );

  return (
    <form className={classes.contributeForm} onSubmit={handleSubmit}>
      <TextField
        multiline
        id="quote"
        name="quote"
        type="text"
        label="What is the promise?"
        fullWidth
        margin="normal"
        value={values.quote || ''}
        onChange={handleChange}
        helperText={response.quote && response.quote}
      />
      <TextField
        id="source"
        name="source"
        type="text"
        fullWidth
        margin="normal"
        label="Sources"
        value={values.source || ''}
        onChange={handleChange}
        helperText={response.source && response.source}
      />
      <br />
      <FormHelperText id="component-helper-text">
        Please state who made the promise,when and where. Include any supporting
        link if possible
      </FormHelperText>
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
