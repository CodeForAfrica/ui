import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@material-ui/core";
import { RichTypography } from "@commons-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import subscribeImg from "@/promisetracker/assets/subscribe-img.png";
import email from "@/promisetracker/assets/subscribe-email.svg";
import config from "config";

const useStyles = makeStyles(({ breakpoints, typography, widths }) => ({
  root: {
    backgroundColor: "#90d9fc",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [breakpoints.up("md")]: {
      height: "25rem",
    },
  },
  content: {
    maxWidth: widths.values.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    padding: 0,
    textAlign: "left",
    textTransform: "capitalize",
  },
  textContainer: {
    width: "100%",
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
      color: "currentColor",
      margin: "1rem 0",
      width: "100%",
      "&:focus": {
        outline: "none",
      },
      [breakpoints.up("md")]: {
        width: typography.pxToRem((395 * widths.values.md) / widths.values.xl),
      },
      [breakpoints.up("lg")]: {
        width: typography.pxToRem((395 * widths.values.lg) / widths.values.xl),
      },
      [breakpoints.up("xl")]: {
        width: typography.pxToRem(395),
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
  grid: {
    display: "flex",
    padding: "1rem",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    padding: "1rem 0rem 1.5rem 0rem",
    textAlign: "left",
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
      <Grid container className={classes.content}>
        <Grid className={classes.grid} item xs={12} md={6}>
          <img src={subscribeImg} alt="Subscribe" className={classes.image} />
        </Grid>
        <Grid className={classes.grid} item xs={12} md={6}>
          <div className={classes.textContainer}>
            <Typography variant="h1" className={classes.title}>
              {title}
            </Typography>
            {description && (
              <Typography variant="body1" className={classes.description}>
                {description}
              </Typography>
            )}
            <RichTypography
              selector="#mc_embed_signup"
              classes={{ root: classes.form }}
            >
              {config.settings.subscribe.embedCode}
            </RichTypography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
Newsletter.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  enterEmailPlaceholder: PropTypes.string,
};

Newsletter.defaultProps = {
  description: "To get all latest news and updates",
  title: "Subscribe",
  enterEmailPlaceholder: "Please Enter your email",
};

export default Newsletter;
