import { Section } from "@commons-ui/core";
import { Button, Typography, Grid } from "@material-ui/core";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import Router from "next/router";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import useStyles from "./useStyles";

import googleIcon from "@/promisetracker/assets/google-icon.svg";
import LoginForm from "@/promisetracker/components/LoginForm";
import getErrorDescription from "@/promisetracker/utils/auth/error-list";

function Login({
  providers: providersProp,
  loginLabel,
  description,
  ...props
}) {
  const classes = useStyles(props);
  const { data: session } = useSession();
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    setErrorMessage(getErrorDescription(Router.query?.error));
  }, []);

  useEffect(() => {
    if (session) {
      Router.push("/act-now");
    }
  }, [session]);

  const providers = providersProp ? Object.values(providersProp) : undefined;

  return (
    <Section classes={{ root: classes.section, title: classes.sectionTitle }}>
      <Grid container>
        <Grid item xs={12} md={7} className={classes.container}>
          <Typography variant="h2">Login</Typography>
          <Typography className={classes.text}>{description}</Typography>
          {errorMessage && (
            <Typography variant="body2" className={classes.error}>
              {errorMessage}
            </Typography>
          )}
          <LoginForm />
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
                    <Image height={45} width={45} src={googleIcon} alt="" />
                    <Typography variant="body1" className={classes.signinText}>
                      Sign in With {provider.name}
                    </Typography>
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
  title: PropTypes.string,
  loginLabel: PropTypes.string,
  description: PropTypes.string,
  googleIcon: PropTypes.string,
};

Login.defaultProps = {
  providers: undefined,
  loginLabel: undefined,
  title: undefined,
  description: undefined,
  googleIcon: undefined,
};

export default Login;
