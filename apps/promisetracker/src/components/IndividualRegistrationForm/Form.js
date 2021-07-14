import {
  Button,
  FormControlLabel,
  FormHelperText,
  Grid,
  Typography,
} from "@material-ui/core";
import { ErrorMessage, Form as FForm, Field } from "formik";
import { Checkbox } from "formik-material-ui";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

import Input from "@/promisetracker/components/Form/Input";
import Label from "@/promisetracker/components/Form/Label";

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
          <Label error={errors?.firstName} htmlFor={`${name}-first-name`}>
            {fields?.firstName?.label}
          </Label>
          <Input
            id={`${name}-first-name`}
            name="firstName"
            placeholder={fields?.firstName?.placeholder}
            aria-describedby={`${name}-first-name-helper-text`}
          />
          <FormHelperText
            id={`${name}-first-name-helper-text`}
            error={errors?.firstName}
          >
            <ErrorMessage name="firstName" />
          </FormHelperText>
        </Grid>
        <Grid item xs={12}>
          <Label error={errors?.lastName} htmlFor={`${name}-last-name`}>
            {fields?.lastName?.label}
          </Label>
          <Input
            id={`${name}-last-name`}
            name="lastName"
            placeholder={fields?.lastName?.placeholder}
            aria-describedby={`${name}-last-name-helper-text`}
          />
          <FormHelperText
            id={`${name}-last-name-helper-text`}
            error={errors?.lastName}
          >
            <ErrorMessage name="lastName" />
          </FormHelperText>
        </Grid>
        <Grid item xs={12}>
          <Label error={errors?.email} htmlFor={`${name}-email`}>
            {fields?.email?.label}
          </Label>
          <Input
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
          <Label error={errors?.password} htmlFor={`${name}-email`}>
            {fields?.password?.label}
          </Label>
          <Input
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
          <Label error={errors?.bio} htmlFor={`${name}-bio`}>
            {fields?.bio?.label}
          </Label>
          <Input
            id={`${name}-bio`}
            name="bio"
            multiline
            placeholder={fields?.bio?.placeholder}
            rowsMin={4}
            rows={4}
          />
          <FormHelperText id={`${name}-bio-helper-text`} error={errors?.bio}>
            <ErrorMessage name="bio" />
          </FormHelperText>
        </Grid>
        <Grid item xs={12}>
          <Label error={errors?.location} htmlFor={`${name}-location`}>
            {fields?.location?.label}
          </Label>
          <Input
            id={`${name}-location`}
            name="location"
            multiline
            placeholder={fields?.location?.placeholder}
            rowsMin={4}
            rows={4}
          />
          <FormHelperText
            id={`${name}-location-helper-text`}
            error={errors?.location}
          >
            <ErrorMessage name="location" />
          </FormHelperText>
        </Grid>
        <Grid item xs={12}>
          <Label error={errors?.phoneNumber} htmlFor={`${name}-phone-number`}>
            {fields?.phoneNumber?.label}
          </Label>
          <Input
            id={`${name}-phone-number`}
            name="phoneNumber"
            type="tel"
            placeholder={fields?.phoneNumber?.placeholder}
          />
          <FormHelperText
            id={`${name}-phone-number-helper-text`}
            error={errors?.phoneNumber}
          >
            <ErrorMessage name="phoneNumber" />
          </FormHelperText>
        </Grid>
        <Grid item xs={12}>
          <Label error={errors?.socialMedia} htmlFor={`${name}-social-media`}>
            {fields?.socialMedia?.label}
          </Label>
          <Input
            id={`${name}-social-media`}
            name="socialMedia"
            type="url"
            placeholder={fields?.socialMedia?.placeholder}
          />
          <FormHelperText
            id={`${name}-social-media-helper-text`}
            error={errors?.socialMedia}
          >
            <ErrorMessage name="socialMedia" />
          </FormHelperText>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            error={errors?.agree}
            control={
              <Field
                component={Checkbox}
                color="primary"
                type="checkbox"
                name="agree"
                classes={{
                  root: classes.checkbox,
                }}
              />
            }
            label={
              <Typography variant="overline">{fields?.agree?.label}</Typography>
            }
            className={classes.checkboxLabelAgree}
          />
          <FormHelperText
            id={`${name}-agree-helper-text`}
            error={errors?.agree}
          >
            <ErrorMessage name="agree" />
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
            className={classes.buttonSubmit}
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
    agree: PropTypes.shape({
      label: PropTypes.string,
    }),
    bio: PropTypes.shape({
      label: PropTypes.string,
      placeholder: PropTypes.string,
    }),
    email: PropTypes.shape({
      label: PropTypes.string,
      placeholder: PropTypes.string,
    }),
    firstName: PropTypes.shape({
      label: PropTypes.string,
      placeholder: PropTypes.string,
    }),
    lastName: PropTypes.shape({
      label: PropTypes.string,
      placeholder: PropTypes.string,
    }),
    location: PropTypes.shape({
      label: PropTypes.string,
      placeholder: PropTypes.string,
    }),
    message: PropTypes.shape({
      label: PropTypes.string,
      placeholder: PropTypes.string,
    }),
    password: PropTypes.shape({
      label: PropTypes.string,
      placeholder: PropTypes.string,
    }),
    phoneNumber: PropTypes.shape({
      label: PropTypes.string,
      placeholder: PropTypes.string,
    }),
    socialMedia: PropTypes.shape({
      label: PropTypes.string,
      placeholder: PropTypes.string,
    }),
    submit: PropTypes.shape({
      label: PropTypes.string,
    }),
  }),
  errors: PropTypes.shape({
    agree: PropTypes.string,
    bio: PropTypes.string,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    location: PropTypes.string,
    message: PropTypes.string,
    password: PropTypes.string,
    phoneNumber: PropTypes.string,
    socialMedia: PropTypes.string,
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
