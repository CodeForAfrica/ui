import { Formik } from "formik";
import { signIn } from "next-auth/client";
import PropTypes from "prop-types";
import React, { useState } from "react";

import Form from "./Form";

function LoginForm({ defaultErrorMessage, onSubmit, submitUrl }) {
  const [status, setStatus] = useState({});
  const fields = {
    email: {
      label: "Email*",
      placeholder: "",
      error: "Required and must be a valid email address",
    },

    password: {
      label: "Password*",
      placeholder: "",
      error: "Required",
    },
    submit: { label: "Submit" },
  };
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validate={(values) => {
        const errors = {};
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
        return errors;
      }}
      onSubmit={async ({ email, password }, { setErrors, setSubmitting }) => {
        if (submitUrl) {
          try {
            setStatus({ children: undefined });
            await signIn("credentials", { email, password });
            if (onSubmit) {
              onSubmit();
            }
          } catch (e) {
            setErrors(e);
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

LoginForm.propTypes = {
  defaultErrorMessage: PropTypes.string,
  onSubmit: PropTypes.func,
  submitUrl: PropTypes.string,
};

LoginForm.defaultProps = {
  defaultErrorMessage: undefined,
  onSubmit: false,
  submitUrl: undefined,
};

export default LoginForm;
