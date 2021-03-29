import React from "react";
import PropTypes from "prop-types";

import { Grid, IconButton } from "@material-ui/core";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkIcon from "@material-ui/icons/Link";
import GetAppIcon from "@material-ui/icons/GetApp";
import CodeIcon from "@material-ui/icons/Code";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import BaseContent from "./BaseContent";

import useStyles from "./useStyles";

const ShareCard = ({ closeCard }) => {
  const classes = useStyles();

  return (
    <BaseContent
      onCloseCard={closeCard}
      title="Share"
      description="Help mobilise your community by sharing this promise on social media"
    >
      <Grid className={classes.flexItem} justify="center">
        <IconButton className={classes.iconButton} color="primary">
          <LinkIcon />
        </IconButton>

        <IconButton className={classes.iconButton} color="primary">
          <GetAppIcon />
        </IconButton>

        <IconButton className={classes.iconButton} color="primary">
          <CodeIcon />
        </IconButton>

        <IconButton className={classes.iconButton} color="primary">
          <InstagramIcon />
        </IconButton>

        <IconButton className={classes.iconButton} color="primary">
          <TwitterIcon />
        </IconButton>

        <IconButton className={classes.iconButton} color="primary">
          <FacebookIcon />
        </IconButton>
      </Grid>
    </BaseContent>
  );
};

ShareCard.propTypes = {
  closeCard: PropTypes.func.isRequired,
};

export default ShareCard;
