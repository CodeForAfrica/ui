import React from "react";
import PropTypes from "prop-types";

import { CardContent, Typography, Grid, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkIcon from "@material-ui/icons/Link";
import GetAppIcon from "@material-ui/icons/GetApp";
import CodeIcon from "@material-ui/icons/Code";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";

import useStyles from "./useStyles";

const ShareCard = ({ toggle }) => {
  const classes = useStyles();

  return (
    <CardContent className={classes.cardContent}>
      <CloseIcon onClick={toggle} className={classes.closeIcon} />
      <Grid container justify="center">
        <Typography variant="h4">Share</Typography>
      </Grid>
      <Grid container justify="center">
        <p className={classes.cardText}>
          Help mobilise your community by sharing this promise on social media
        </p>
      </Grid>
      <Grid container justify="center">
        <IconButton color="primary">
          <LinkIcon />
        </IconButton>

        <IconButton color="primary">
          <GetAppIcon />
        </IconButton>

        <IconButton color="primary">
          <CodeIcon />
        </IconButton>

        <IconButton color="primary">
          <InstagramIcon />
        </IconButton>

        <IconButton color="primary">
          <TwitterIcon />
        </IconButton>

        <IconButton color="primary">
          <FacebookIcon />
        </IconButton>
      </Grid>
    </CardContent>
  );
};

ShareCard.propTypes = {
  toggle: PropTypes.func,
};

ShareCard.defaultProps = {
  toggle: undefined,
};

export default ShareCard;
