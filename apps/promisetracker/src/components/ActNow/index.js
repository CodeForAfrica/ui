import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, Button } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import actNowImg from "assets/actnow-img.png";

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: "#ebebeb",
  },
  title: {
    padding: 0,
    textAlign: "left",
    textTransform: "capitalize",
  },
  textContainer: {
    width: "100%",
    padding: "0rem 2rem",
    [breakpoints.up("md")]: {
      width: "80%",
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
    [breakpoints.up("md")]: {
      lineHeight: "1.875rem",
    },
  },
}));

function ActNow({ description: descriptionProp, title, ...props }) {
  const classes = useStyles(props);
  const description =
    (descriptionProp && descriptionProp.length > 0 && descriptionProp) ||
    undefined;

  return (
    <Grid container className={classes.root}>
      <Grid className={classes.grid} item xs={12} md={6}>
        <div className={classes.textContainer}>
          <Typography variant="h1" className={classes.title}>
            {title}
          </Typography>
          <Typography variant="body1" className={classes.description}>
            {description}
          </Typography>
          <Button variant="contained" size="large">
            Act Now
          </Button>
        </div>
      </Grid>
      <Grid className={classes.grid} item xs={12} md={6}>
        <img src={actNowImg} alt="Act Now" className={classes.image} />
      </Grid>
    </Grid>
  );
}
ActNow.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};

ActNow.defaultProps = {
  description:
    "Have you spotted a promise in action? See something wrong? Share data to help assess a promise!",
  title: "Act Now",
};

export default ActNow;
