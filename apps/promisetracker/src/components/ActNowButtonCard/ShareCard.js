import React from "react";
import PropTypes from "prop-types";

import { Grid, IconButton } from "@material-ui/core";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkIcon from "@material-ui/icons/Link";
import GetAppIcon from "@material-ui/icons/GetApp";
import CodeIcon from "@material-ui/icons/Code";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import BaseCard from "./BaseCard";

import useStyles from "./useStyles";

const ShareCard = ({ closeCard }) => {
  const classes = useStyles();

  return (
    <BaseCard
      closeCard={closeCard}
      title="Share"
      description="Help mobilise your community by sharing this promise on social media"
    >
      <Grid className={classes.flexItem} justify="center">
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
    </BaseCard>
  );
};

ShareCard.propTypes = {
  closeCard: PropTypes.func,
};

ShareCard.defaultProps = {
  closeCard: undefined,
};

export default ShareCard;
