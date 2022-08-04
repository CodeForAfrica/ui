import CloseIcon from "@mui/icons-material/Close";
import { CardContent, Typography, Grid } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

function BaseCard({ onCloseCard, title, description, children }) {
  const classes = useStyles();

  return (
    <CardContent className={classes.cardContent}>
      {onCloseCard && (
        <CloseIcon onClick={onCloseCard} className={classes.closeIcon} />
      )}
      {title && (
        <Grid className={!onCloseCard ? classes.titleContent : ""}>
          <Typography align="center" variant="h4">
            {title}
          </Typography>
        </Grid>
      )}
      {description && (
        <Grid>
          <Typography
            align="center"
            variant="body2"
            className={classes.cardText}
          >
            {description}
          </Typography>
        </Grid>
      )}
      {children}
    </CardContent>
  );
}

BaseCard.propTypes = {
  onCloseCard: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

BaseCard.defaultProps = {
  onCloseCard: undefined,
  description: undefined,
  children: undefined,
};

export default BaseCard;
