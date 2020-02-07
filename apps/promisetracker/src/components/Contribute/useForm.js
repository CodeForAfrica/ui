import { useState, useEffect } from 'react';
import putPromise from 'lib/putPromise';

const useForm = validate => {
  const [values, setValues] = useState({});
  const [response, setResponse] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (Object.keys(response).length === 0 && submitted) {
      setValues(false);
    }
  }, [response]);

  const handleSubmit = event => {
    if (event) event.preventDefault();

    setResponse(validate(values));
    if (
      Object.keys(values).length <= 1 ||
      values.quote === '' ||
      values.source === ''
    ) {
      setSubmitted(false);
      return false;
    }

    putPromise({ data: values });
    setSubmitted(true);
    setValues({});
    return true;
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
