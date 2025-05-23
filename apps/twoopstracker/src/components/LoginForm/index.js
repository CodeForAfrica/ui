import {
  IconButton,
  Button,
  Typography,
  Grid,
  TextField,
  FormHelperText,
  InputAdornment,
} from "@mui/material";
import { Formik } from "formik";
import Router from "next/router";
import { useSession, signIn } from "next-auth/react";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import * as yup from "yup";

import useStyles from "./useStyles";

import Image from "@/twoopstracker/components/Image";
import Link from "@/twoopstracker/components/Link";
import Section from "@/twoopstracker/components/Section";

function Login({
  providers: providersProp,
  title,
  loginLabel,
  description,
  forgotPasswordLink,
  forgotPasswordPrompt,
  signUpPrompt,
  signUpLink,
  signUpLabel,
  signInLabel,
  googleIcon,
  passwordShowIcon,
  passwordHideIcon,
  ...props
}) {
  const classes = useStyles(props);
  const { data: session } = useSession();
  const [isPassword, setIsPassword] = useState(true);

  const togglePasswordType = () => {
    setIsPassword(!isPassword);
  };

  const handleSubmit = async (values, { setStatus }) => {
    const res = await signIn("credentials", { ...values, redirect: false });
    if (res.error) {
      setStatus(res.error);
    } else if (res.ok) {
      Router.push("/explore ");
    }
  };

  const initialValues = {
    email: "",
    password: "",
    type: "login",
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });

  useEffect(() => {
    if (session) {
      Router.push("/explore");
    }
  }, [session]);

  const providers = Object.values(providersProp ?? {});

  return (
    <Section className={classes.section}>
      <Grid container>
        <Grid item xs={12} md={7} className={classes.container}>
          <Typography variant="h2">{title}</Typography>
          <Typography className={classes.text}>{description}</Typography>
          <Formik
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            {({
              errors,
              handleSubmit: handleSubmitProp,
              handleChange,
              touched,
              status,
            }) => (
              <form className={classes.form} onSubmit={handleSubmitProp}>
                {status?.length && (
                  <FormHelperText
                    component="div"
                    error
                    classes={{ root: classes.textfield }}
                  >
                    <Typography variant="caption">{status}</Typography>
                  </FormHelperText>
                )}
                <TextField
                  className={classes.textfield}
                  InputLabelProps={{
                    className: classes.label,
                    shrink: false,
                    required: false,
                  }}
                  InputProps={{
                    className: classes.input,
                  }}
                  autoComplete="email"
                  name="email"
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email"
                  autoFocus
                  color="secondary"
                  onChange={handleChange}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />

                <TextField
                  className={classes.textfield}
                  InputLabelProps={{
                    className: classes.label,
                    shrink: false,
                    required: false,
                  }}
                  InputProps={{
                    className: classes.input,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          className={classes.passwordButton}
                          onClick={() => togglePasswordType()}
                          size="large"
                        >
                          <Image
                            height={45}
                            width={45}
                            alt="Password Icon"
                            src={
                              isPassword ? passwordHideIcon : passwordShowIcon
                            }
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type={isPassword ? "password" : "text"}
                  id="password"
                  autoComplete="current-password"
                  color="secondary"
                  onChange={handleChange}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  {loginLabel}
                </Button>
              </form>
            )}
          </Formik>
          <div className={classes.buttonContainer}>
            {!session &&
              providers &&
              Object.values(providers).map((provider) => {
                if (provider.id === "google") {
                  return (
                    <Button
                      key={provider.name}
                      value="Subscribe"
                      name="submit"
                      id="mc-embedded-subscribe-form"
                      variant="contained"
                      className={classes.loginButton}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        signIn(provider.id, {
                          callbackUrl: `${window.location.origin}/explore`,
                        })
                      }
                    >
                      <Image height={45} width={45} src={googleIcon} alt="" />
                      <Typography className={classes.signinText}>
                        {signInLabel}
                        {provider.name}
                      </Typography>
                    </Button>
                  );
                }
                return null;
              })}
          </div>
          <Button
            component={Link}
            href={forgotPasswordLink}
            classes={{ text: classes.passwordText }}
          >
            {forgotPasswordPrompt}
          </Button>
          <Typography className={classes.text}>
            {signUpPrompt} <Link href={signUpLink}>{signUpLabel}</Link>
          </Typography>
        </Grid>
      </Grid>
    </Section>
  );
}

Login.propTypes = {
  providers: PropTypes.shape({}),
  title: PropTypes.string,
  loginLabel: PropTypes.string,
  description: PropTypes.string,
  forgotPasswordLink: PropTypes.string,
  forgotPasswordPrompt: PropTypes.string,
  signUpPrompt: PropTypes.string,
  signUpLabel: PropTypes.string,
  signInLabel: PropTypes.string,
  signUpLink: PropTypes.string,
  googleIcon: PropTypes.string,
  passwordShowIcon: PropTypes.string,
  passwordHideIcon: PropTypes.string,
};

Login.defaultProps = {
  providers: undefined,
  loginLabel: undefined,
  title: undefined,
  forgotPasswordPrompt: undefined,
  description: undefined,
  forgotPasswordLink: undefined,
  signUpPrompt: undefined,
  signUpLink: undefined,
  signUpLabel: undefined,
  signInLabel: undefined,
  googleIcon: undefined,
  passwordShowIcon: undefined,
  passwordHideIcon: undefined,
};

export default Login;
