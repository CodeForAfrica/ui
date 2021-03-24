import React from "react";
import PropTypes from "prop-types";

import { CardContent, Typography, Grid, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { FacebookShareButton, TwitterShareButton } from "react-share";

import twitter from "@/promisetracker/assets/footer-social-tw.svg";
import facebook from "@/promisetracker/assets/footer-social-fb.svg";
import instagram from "@/promisetracker/assets/footer-social-ig.svg";

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
          <FacebookShareButton>
            <img src={instagram} alt="Instagram" />
          </FacebookShareButton>
        </IconButton>

        <IconButton color="primary">
          <TwitterShareButton>
            <img src={twitter} alt="Twitter" />
          </TwitterShareButton>
        </IconButton>

        <IconButton color="primary">
          <FacebookShareButton>
            <img src={facebook} alt="Facebook" />
          </FacebookShareButton>
        </IconButton>

        <IconButton color="primary">
          <FacebookShareButton>
            <img src={instagram} alt="Instagram" />
          </FacebookShareButton>
        </IconButton>

        <IconButton color="primary">
          <TwitterShareButton>
            <img src={twitter} alt="Twitter" />
          </TwitterShareButton>
        </IconButton>

        <IconButton color="primary">
          <FacebookShareButton>
            <img src={facebook} alt="Facebook" />
          </FacebookShareButton>
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
