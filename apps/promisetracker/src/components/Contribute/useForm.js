import { useState, useEffect } from 'react';

const useForm = (callback, validate) => {
  const [values, setValues] = useState({});
  const [response, setResponse] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (Object.keys(response).length === 0 && submitted) {
      callback();
    }
  }, [response]);

  const handleSubmit = event => {
    if (event) event.preventDefault();
    setResponse(validate(values));
    setSubmitted(true);

    setInterval(() => {
      setSubmitted(false);
    }, 4000);
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
    response
  };
};

export default useForm;
