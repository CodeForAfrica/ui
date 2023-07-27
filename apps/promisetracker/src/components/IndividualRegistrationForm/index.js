/* eslint-env browser */
import { Formik } from "formik";
import PropTypes from "prop-types";
import React, { useState } from "react";

import Form from "./Form";

function IndividualRegistrationForm({
  defaultErrorMessage,
  fields,
  onSubmit,
  submitUrl,
}) {
  const [status, setStatus] = useState({});

  return (
    <Formik
      initialValues={{
        agree: false,
        email: "",
        firstName: "",
        lastName: "",
        location: "",
        password: "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.firstName) {
          errors.firstName = fields?.firstName?.error;
        }
        if (!values.lastName) {
          errors.lastName = fields?.lastName?.error;
        }
        if (!values.email) {
          errors.email = fields?.email?.error;
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = fields?.email?.error;
        }
        if (!values.password) {
          errors.password = fields?.password?.error;
        }
        if (!values.location) {
          errors.location = fields?.location?.error;
        }
        if (!values.agree) {
          errors.agree = fields?.agree?.error;
        }
        return errors;
      }}
      onSubmit={async (
        {
          firstName,
          lastName,
          email,
          password,
          bio,
          location,
          phoneNumber,
          socialMedia,
        },
        { setErrors, setSubmitting }
      ) => {
        const body = {
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          bio,
          location,
          phone_number: phoneNumber,
          social_media_link: socialMedia,
        };
        if (submitUrl) {
          try {
            const headers = new Headers({
              "Content-Type": "application/json",
            });
            const response = await fetch(`/api/accounts`, {
              method: "POST",
              headers,
              body: JSON.stringify(body),
            });
            const responseJson = await response.json();
            if (response.status === 201) {
              setStatus({ children: undefined });
              if (onSubmit) {
                onSubmit();
              }
            } else {
              setErrors(responseJson);
              setStatus({ error: true, children: "Error" });
            }
          } catch (e) {
            setStatus({ error: true, children: "Error" });
          } finally {
            setSubmitting(false);
          }
        } else {
          setStatus({ error: true, children: defaultErrorMessage });
        }
      }}
    >
      {({ submitForm, isSubmitting, errors }) => (
        <Form
          disabled={isSubmitting}
          errors={errors}
          status={status}
          fields={fields}
          onSubmit={submitForm}
        />
      )}
    </Formik>
  );
}

IndividualRegistrationForm.propTypes = {
  defaultErrorMessage: PropTypes.string,
  fields: PropTypes.shape({
    agree: PropTypes.shape({
      error: PropTypes.string,
    }),
    email: PropTypes.shape({
      error: PropTypes.string,
    }),
    firstName: PropTypes.shape({ error: PropTypes.string }),
    lastName: PropTypes.shape({ error: PropTypes.string }),
    location: PropTypes.shape({ error: PropTypes.string }),
    password: PropTypes.shape({ error: PropTypes.string }),
  }),
  onSubmit: PropTypes.func,
  submitUrl: PropTypes.string,
};

IndividualRegistrationForm.defaultProps = {
  defaultErrorMessage: undefined,
  fields: undefined,
  onSubmit: false,
  submitUrl: undefined,
};

export default IndividualRegistrationForm;
