import { Formik } from "formik";
import { signIn } from "next-auth/client";
import PropTypes from "prop-types";
import React, { useState } from "react";

import Form from "./Form";

function LoginForm({ onSubmit }) {
  const [status, setStatus] = useState({});
  const fields = {
    email: {
      label: "Email*",
      placeholder: "EMAIL",
      error: "Required and must be a valid email address",
    },

    password: {
      label: "Password*",
      placeholder: "PASSWORD",
      error: "Required",
    },
    submit: { label: "Sign In" },
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
  onSubmit: PropTypes.func,
};

LoginForm.defaultProps = {
  onSubmit: false,
};

export default LoginForm;
