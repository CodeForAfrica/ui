import React from "react";
import PropTypes from "prop-types";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { RichTypography, Section } from "@commons-ui/core";

import email from "@/promisetracker/assets/subscribe-email.svg";
import config from "@/promisetracker/config";
import subscribeImg from "@/promisetracker/assets/illo-subscribe@2400x.png";

const useStyles = makeStyles(({ breakpoints, typography }) => ({
  section: {},
  root: {
    backgroundColor: "#90DAFF",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [breakpoints.up("lg")]: {
      padding: `${typography.pxToRem(25)} 0`,
    },
  },
  contents: {
    minWidth: typography.pxToRem(314),
  },
  title: {
    padding: 0,
    textAlign: "left",
    textTransform: "capitalize",
  },
  textContainer: {
    marginTop: typography.pxToRem(16),
    width: "100%",
    [breakpoints.up("lg")]: {
      marginTop: 0,
    },
  },
  form: {
    "& #mc_embed_signup": {
      background: "inherit",
      color: "inherit",
    },
    "& #mc_embed_signup form": {
      padding: 0,
    },
    "& #mc_embed_signup label": {
      display: "none",
    },
    "& #mc_embed_signup input.email": {
      background: "none",
      border: "none",
      borderBottom: "1px solid currentColor",
      borderRadius: 0,
      color: "currentColor",
      margin: "1rem 0",
      width: "100%",
      "&:focus": {
        outline: "none",
      },
      "&::placeholder": {
        opacity: 1.0,
      },
    },
    "& #mc_embed_signup .button": {
      background: "none",
      outline: "none",
      backgroundImage: `url(${email})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "40px 40px",
      borderBottom: "none",
      height: 55,
      paddingLeft: typography.pxToRem(50),
      "&:hover": {
        background: "none",
        outline: "none",
        backgroundImage: `url(${email})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "40px 40px",
        borderBottom: "none",
      },
      "&:focus": {
        background: "none",
        outline: "none",
        backgroundImage: `url(${email})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "40px 40px",
        borderBottom: "none",
      },
    },
  },
  description: {
    fontSize: typography.pxToRem(18),
  },
  image: {
    marginTop: typography.pxToRem(42),
    minWidth: typography.pxToRem(317),
    width: typography.pxToRem(317),
    [breakpoints.up("lg")]: {
      marginTop: 0,
      marginLeft: typography.pxToRem(54),
      width: typography.pxToRem(458),
    },
  },
}));

function Newsletter({
  description: descriptionProp,
  enterEmailPlaceholder,
  title,
  ...props
}) {
  const classes = useStyles(props);
  const description =
    (descriptionProp && descriptionProp.length > 0 && descriptionProp) ||
    undefined;

  return (
    <div className={classes.root}>
      <Section classes={{ root: classes.section }}>
        <Grid container alignItems="stretch" className={classes.contents}>
          <Grid item xs={12} lg={8}>
            <img src={subscribeImg} alt="Subscribe" className={classes.image} />
          </Grid>
          <Grid item xs={12} lg={4} container alignItems="center">
            <div className={classes.textContainer}>
              <Typography variant="h1" className={classes.title}>
                {title}
              </Typography>
              {description && (
                <Typography variant="body1" className={classes.description}>
                  {description}
                </Typography>
              )}
              <RichTypography classes={{ root: classes.form }}>
                {config.settings.subscribe.embedCode}
              </RichTypography>
            </div>
          </Grid>
        </Grid>
      </Section>
    </div>
  );
}
Newsletter.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  enterEmailPlaceholder: PropTypes.string,
};

Newsletter.defaultProps = {
  description: undefined,
  title: undefined,
  enterEmailPlaceholder: "Please Enter your email",
};

export default Newsletter;
