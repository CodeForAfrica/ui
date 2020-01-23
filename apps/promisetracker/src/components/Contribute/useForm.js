import { useState, useEffect } from 'react';

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const ADD_PROMISE_MEDIA = gql`
  mutation createProjectMedia(
    $clientMutationId: String
    $project_id: Int
    $quote: String
    $quote_attributions: String
  ) {
    createProjectMedia(
      input: {
        clientMutationId: $clientMutationId
        project_id: $project_id
        quote: $quote
        quote_attributions: $quote_attributions
      }
    ) {
      project_media {
        id
        title
        project_id
        project_source {
          id
          source {
            id
            name
          }
        }
      }
    }
  }
`;
const useForm = (callback, validate) => {
  const [values, setValues] = useState({});
  const [response, setResponse] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const [createProjectMedia] = useMutation(ADD_PROMISE_MEDIA);

  useEffect(() => {
    if (Object.keys(response).length === 0 && submitted) {
      callback();
    }
  }, [response]);

  const handleSubmit = event => {
    if (event) event.preventDefault();

    setResponse(validate(values));
    createProjectMedia({
      variables: {
        clientMutationId: '1',
        project_id: 817,
        quote: `Promise Tracker Review: ${values.quote}`,
        quote_attributions: `{"name":"${values.source}"}`
      }
    });
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
