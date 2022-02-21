import { Grid, IconButton, Typography } from "@material-ui/core";
import CodeIcon from "@material-ui/icons/Code";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import MailIcon from "@material-ui/icons/MailOutline";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

function ShareCard({ closeCard, promiseActNow }) {
  const classes = useStyles();

  return (
    <>
      <Typography className={classes.shareTitle} variant="h5">
        Share:
      </Typography>
      <Grid className={classes.flexItem}>
        <IconButton className={classes.iconButton} color="primary">
          <WhatsAppIcon />
        </IconButton>

        <IconButton className={classes.iconButton} color="primary">
          <FacebookIcon />
        </IconButton>

        <IconButton className={classes.iconButton} color="primary">
          <TwitterIcon />
        </IconButton>

        <IconButton className={classes.iconButton} color="primary">
          <InstagramIcon />
        </IconButton>

        <IconButton className={classes.iconButton} color="primary">
          <LinkedInIcon />
        </IconButton>

        <IconButton className={classes.iconButton} color="primary">
          <MailIcon />
        </IconButton>

        <IconButton className={classes.iconButton} color="primary">
          <CodeIcon />
        </IconButton>
      </Grid>
    </>
  );
}

ShareCard.propTypes = {
  closeCard: PropTypes.func.isRequired,
  promiseActNow: PropTypes.shape({
    share: {
      shareTitle: PropTypes.string,
      shareDescription: PropTypes.string,
    },
  }),
};

ShareCard.defaultProps = {
  promiseActNow: PropTypes.shape({
    share: {
      shareTitle: null,
      shareDescription: null,
    },
  }),
};

export default ShareCard;
