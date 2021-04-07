import React from "react";
import PropTypes from "prop-types";

import { Grid, IconButton } from "@material-ui/core";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkIcon from "@material-ui/icons/Link";
import CodeIcon from "@material-ui/icons/Code";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import BaseContent from "./BaseContent";

import useStyles from "./useStyles";

const ShareCard = ({ closeCard, promiseActNow }) => {
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
      <Grid className={classes.flexItem} justify="center">
        <IconButton className={classes.iconButton} color="primary">
          <LinkIcon />
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
