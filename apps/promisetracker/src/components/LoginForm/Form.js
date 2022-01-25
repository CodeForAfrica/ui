import { Button, FormHelperText, Grid } from "@material-ui/core";
import { ErrorMessage, Form as FForm } from "formik";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

import Input from "@/promisetracker/components/Form/Input";

function Form({
  disabled,
  errors,
  fields,
  name: nameProp,
  onSubmit,
  status,
  ...props
}) {
  const classes = useStyles(props);
  const name = nameProp || "individual-registration-form";

  return (
    <FForm className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Input
            inputProps={{ className: classes.input }}
            id={`${name}-email`}
            name="email"
            type="email"
            placeholder={fields?.email?.placeholder}
          />
          <FormHelperText
            id={`${name}-email-helper-text`}
            error={errors?.email}
          >
            <ErrorMessage name="email" />
          </FormHelperText>
        </Grid>
        <Grid item xs={12}>
          <Input
            inputProps={{ className: classes.input }}
            id={`${name}-password`}
            name="password"
            type="password"
            placeholder={fields?.password?.placeholder}
          />
          <FormHelperText
            id={`${name}-password-helper-text`}
            error={errors?.password}
          >
            <ErrorMessage name="password" />
          </FormHelperText>
        </Grid>
        <Grid item xs={12}>
          <FormHelperText
            className={!status.error ? classes.success : ""}
            id={`${name}-status-helper-text`}
            {...status}
          />
          <Button
            variant="contained"
            color="secondary"
            disabled={disabled}
            onClick={onSubmit}
            className={classes.authButton}
          >
            {fields?.submit?.label}
          </Button>
        </Grid>
      </Grid>
    </FForm>
  );
}

Form.propTypes = {
  disabled: PropTypes.bool,
  fields: PropTypes.shape({
    email: PropTypes.shape({
      label: PropTypes.string,
      placeholder: PropTypes.string,
    }),
    password: PropTypes.shape({
      label: PropTypes.string,
      placeholder: PropTypes.string,
    }),
    submit: PropTypes.shape({
      label: PropTypes.string,
    }),
  }),
  errors: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }),
  name: PropTypes.string,
  onSubmit: PropTypes.func,
  status: PropTypes.shape({
    error: PropTypes.shape({}),
  }),
};

Form.defaultProps = {
  disabled: undefined,
  errors: undefined,
  fields: undefined,
  name: undefined,
  onSubmit: undefined,
  status: undefined,
};

export default Form;
