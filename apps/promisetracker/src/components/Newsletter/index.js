import { RichTypography, Section } from "@commons-ui/core";
import { Grid, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

import subscribeImg from "@/promisetracker/assets/illo-subscribe@2400x.png";
import email from "@/promisetracker/assets/subscribe-email.svg?url";
import config from "@/promisetracker/config";

const useStyles = makeStyles(({ breakpoints, typography }) => ({
  section: {},
  root: {
    alignItems: "center",
    backgroundColor: "#90DAFF",
    display: "flex",
    justifyContent: "center",
    padding: `${typography.pxToRem(36)} 0 ${typography.pxToRem(49)}`,
    width: "100%",
    [breakpoints.up("lg")]: {
      padding: `${typography.pxToRem(25)} 0`,
    },
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
      backgroundImage: `url("${email.src}")`,
      backgroundRepeat: "no-repeat",
      backgroundSize: `${email.width} ${email.height}`,
      border: "none",
      height: email.height,
      padding: 0,
      width: email.width,
      "&:hover": {
        background: "none",
        outline: "none",
        backgroundImage: `url("${email.src}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: `${email.width} ${email.height}`,
        border: "none",
      },
      "&:focus": {
        background: "none",
        outline: "none",
        backgroundImage: `url("${email.src}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: `${email.width} ${email.height}`,
        border: "none",
      },
    },
  },
  description: {
    fontSize: typography.pxToRem(18),
  },
  figure: {
    height: typography.pxToRem(250),
    margin: 0,
    width: typography.pxToRem(314),
    position: "relative",
    [breakpoints.up("lg")]: {
      height: typography.pxToRem(350),
      marginTop: 0,
      marginLeft: typography.pxToRem(54),
      width: typography.pxToRem(458),
    },
  },
  image: {
    objectFit: "contain",
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
        <Grid container justifyContent="space-between" alignItems="stretch">
          <Grid item>
            <figure className={classes.figure}>
              <Image
                src={subscribeImg}
                alt="Subscribe"
                fill
                className={classes.image}
              />
            </figure>
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
