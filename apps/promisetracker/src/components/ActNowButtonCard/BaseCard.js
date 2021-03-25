import React from "react";
import PropTypes from "prop-types";

import { CardContent, Typography, Grid } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import useStyles from "./useStyles";

const BaseCard = ({ toggle, title, description }) => {
  const classes = useStyles();

  return (
    <CardContent className={classes.cardContent}>
      <CloseIcon onClick={toggle} className={classes.closeIcon} />
      {title && (
        <Grid container justify="center">
          <Typography variant="h4">{title}</Typography>
        </Grid>
      )}
      {description && (
        <Grid container justify="center">
          <p className={classes.cardText}>{description}</p>
        </Grid>
      )}
    </CardContent>
  );
};

BaseCard.propTypes = {
  toggle: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
};

BaseCard.defaultProps = {
  toggle: undefined,
  description: undefined,
  title: undefined,
};

export default BaseCard;
