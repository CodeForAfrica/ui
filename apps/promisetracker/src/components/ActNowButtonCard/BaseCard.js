import React from "react";
import PropTypes from "prop-types";

import { CardContent, Typography, Grid } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import useStyles from "./useStyles";

const BaseCard = ({ closeCard, title, description, children }) => {
  const classes = useStyles();

  return (
    <CardContent className={classes.cardContent}>
      <CloseIcon onClick={closeCard} className={classes.closeIcon} />
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
      {children}
    </CardContent>
  );
};

BaseCard.propTypes = {
  closeCard: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
};

BaseCard.defaultProps = {
  closeCard: undefined,
  description: undefined,
  title: undefined,
  children: undefined,
};

export default BaseCard;
