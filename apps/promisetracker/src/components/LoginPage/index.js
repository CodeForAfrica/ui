/* eslint-env browser */
import { Section } from "@commons-ui/core";
import { Button, Typography, Grid } from "@mui/material";
import { signIn } from "next-auth/react";
import Router from "next/router";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import useStyles from "./useStyles";

import LoginForm from "@/promisetracker/components/LoginForm";
import getErrorDescription from "@/promisetracker/utils/auth/error-list";

function Login({ providers: providersProp, ...props }) {
  const classes = useStyles(props);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    setErrorMessage(getErrorDescription(Router.query?.error));
  }, []);

  const providers = providersProp ? Object.values(providersProp) : undefined;

  return (
    <Section classes={{ root: classes.section, title: classes.sectionTitle }}>
      <Grid justifyContent="center" alignItems="center" container>
        <Grid
          direction="column"
          container
          alignItems="center"
          item
          xs={12}
          md={7}
          className={classes.container}
        >
          <Typography variant="h2">Login</Typography>
          {errorMessage && (
            <Typography variant="body2" className={classes.error}>
              {errorMessage}
            </Typography>
          )}
          <LoginForm
            classes={{ buttonContainer: classes.formButtonContainer }}
          />
          <div className={classes.buttonContainer}>
            {providers?.map((provider) => {
              if (provider.id === "google") {
                return (
                  <Button
                    key={provider.name}
                    variant="contained"
                    className={classes.loginButton}
                    onClick={() =>
                      signIn(provider.id, {
                        callbackUrl: `${window.location.origin}/act-now`,
                      })
                    }
                  >
                    Sign in With {provider.name}
                  </Button>
                );
              }
              return null;
            })}
          </div>
        </Grid>
      </Grid>
    </Section>
  );
}

Login.propTypes = {
  providers: PropTypes.shape({}),
};

Login.defaultProps = {
  providers: undefined,
};

export default Login;
