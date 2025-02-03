import clsx from "clsx";
import { Field } from "formik";
import { InputBase } from "formik-mui";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

function Input({ className, type = "text", ...props }) {
  const classes = useStyles(props);

  return (
    <Field
      {...props}
      component={InputBase}
      type={type}
      className={clsx(classes.input, className)}
    />
  );
}

Input.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(["email", "password", "tel", "text", "url"]),
};

export default Input;
