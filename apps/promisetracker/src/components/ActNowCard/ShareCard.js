import CodeIcon from "@mui/icons-material/Code";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkIcon from "@mui/icons-material/Link";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Grid, IconButton } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import BaseContent from "./BaseContent";
import useStyles from "./useStyles";

function ShareCard({ closeCard, promiseActNow }) {
  const classes = useStyles();

  const {
    share: { share_title: shareTitle, share_description: shareDescription },
  } = promiseActNow;

  return (
    <BaseContent
      onCloseCard={closeCard}
      title={shareTitle}
      description={shareDescription}
    >
      <Grid className={classes.flexItem} justifyContent="center">
        <IconButton className={classes.iconButton} color="primary" size="large">
          <LinkIcon />
        </IconButton>

        <IconButton className={classes.iconButton} color="primary" size="large">
          <CodeIcon />
        </IconButton>

        <IconButton className={classes.iconButton} color="primary" size="large">
          <InstagramIcon />
        </IconButton>

        <IconButton className={classes.iconButton} color="primary" size="large">
          <TwitterIcon />
        </IconButton>

        <IconButton className={classes.iconButton} color="primary" size="large">
          <FacebookIcon />
        </IconButton>
      </Grid>
    </BaseContent>
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
