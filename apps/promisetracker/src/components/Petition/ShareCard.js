import CodeIcon from "@mui/icons-material/Code";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailIcon from "@mui/icons-material/MailOutline";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Grid, IconButton, Typography } from "@mui/material";
import React from "react";

import useStyles from "./useStyles";

function ShareCard() {
  const classes = useStyles();

  return (
    <>
      <Typography className={classes.shareTitle} variant="h5">
        Share:
      </Typography>
      <Grid className={classes.flexItem}>
        <IconButton className={classes.iconButton} color="primary" size="large">
          <WhatsAppIcon />
        </IconButton>

        <IconButton className={classes.iconButton} color="primary" size="large">
          <FacebookIcon />
        </IconButton>

        <IconButton className={classes.iconButton} color="primary" size="large">
          <TwitterIcon />
        </IconButton>

        <IconButton className={classes.iconButton} color="primary" size="large">
          <InstagramIcon />
        </IconButton>

        <IconButton className={classes.iconButton} color="primary" size="large">
          <LinkedInIcon />
        </IconButton>

        <IconButton className={classes.iconButton} color="primary" size="large">
          <MailIcon />
        </IconButton>

        <IconButton className={classes.iconButton} color="primary" size="large">
          <CodeIcon />
        </IconButton>
      </Grid>
    </>
  );
}

export default ShareCard;
