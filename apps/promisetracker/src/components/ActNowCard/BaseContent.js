import React from "react";
import PropTypes from "prop-types";

import { CardContent, Typography, Grid } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import useStyles from "./useStyles";

const BaseCard = ({ close, onCloseCard, title, description, children }) => {
  const classes = useStyles();

  return (
    <CardContent className={classes.cardContent}>
      {close && (
        <CloseIcon onClick={onCloseCard} className={classes.closeIcon} />
      )}
      {title && (
        <Grid
          container
          justify="center"
          className={!close ? classes.titleContent : ""}
        >
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
  onCloseCard: PropTypes.func.isRequired,
  description: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  close: PropTypes.bool,
};

BaseCard.defaultProps = {
  description: undefined,
  children: undefined,
  close: undefined,
};

export default BaseCard;
