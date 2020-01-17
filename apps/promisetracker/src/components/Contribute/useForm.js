import { useState, useEffect } from 'react';

const useForm = (callback, ValidateErrors) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitted) {
      callback();
    }
  }, [errors]);

  const handleSubmit = event => {
    if (event) event.preventDefault();
    setErrors(ValidateErrors(values));
    setSubmitted(true);
  };

  const handleChange = event => {
    event.persist();
    /* eslint-disable no-shadow */
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value
    }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors
  };
};

export default useForm;
