import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import subscribeImg from "@/promisetracker/assets/subscribe-img.png";

import Form from "./Form";

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: "#90d9fc",
    [breakpoints.up("md")]: {
      height: "25rem",
    },
  },
  title: {
    padding: 0,
    textAlign: "left",
    textTransform: "capitalize",
  },
  textContainer: {
    width: "100%",
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
    <Grid container className={classes.root}>
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
          <Form placeholder={enterEmailPlaceholder} />
        </div>
      </Grid>
    </Grid>
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
