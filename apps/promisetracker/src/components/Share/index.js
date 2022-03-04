import {
  Grid,
  Fade,
  Paper,
  Popper,
  IconButton,
  ClickAwayListener,
} from "@material-ui/core";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";

import useStyles from "./useStyles";

import facebook from "@/promisetracker/assets/footer-social-fb.svg";
import linkedIn from "@/promisetracker/assets/footer-social-ln.svg";
import twitter from "@/promisetracker/assets/footer-social-tw.svg";
import ShareIcon from "@/promisetracker/icons/Share";

function Share({ link, title, description, ...props }) {
  const classes = useStyles(props);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [placement, setPlacement] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClick = (newPlacement) => (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const handleClickAway = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleClick("left")}
        aria-label="share"
        className={classes.share}
      >
        <ShareIcon fontSize="inherit" className={classes.shareIcon} />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorEl}
        disablePortal
        placement={placement}
        transition
        className={classes.popper}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClickAway}>
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                <Grid container className={classes.socialIconPopper}>
                  <TwitterShareButton
                    title={title}
                    url={link}
                    additionalProps={{
                      "ga-on": "click",
                      "ga-event-category": "twitter",
                      "ga-event-action": "tweet",
                      "ga-event-label": link,
                    }}
                    className={classes.socialLink}
                  >
                    <Image
                      src={twitter}
                      alt="Twitter"
                      height="40"
                      width="40"
                      className={classes.socialIcon}
                    />
                  </TwitterShareButton>
                  <FacebookShareButton
                    quote={title}
                    url={link}
                    additionalProps={{
                      "ga-on": "click",
                      "ga-event-category": "facebook",
                      "ga-event-action": "send",
                      "ga-event-label": link,
                    }}
                    className={classes.socialLink}
                  >
                    <Image
                      src={facebook}
                      alt="Facebook"
                      height="40"
                      width="40"
                      className={classes.socialIcon}
                    />
                  </FacebookShareButton>
                  <LinkedinShareButton
                    title={title}
                    url={link}
                    source={link}
                    additionalProps={{
                      "ga-on": "click",
                      "ga-event-category": "linkedin",
                      "ga-event-action": "share",
                      "ga-event-label": link,
                    }}
                    className={classes.socialLink}
                  >
                    <Image
                      src={linkedIn}
                      alt="LinkedIn"
                      height="40"
                      width="40"
                      className={classes.socialIcon}
                    />
                  </LinkedinShareButton>
                </Grid>
              </Paper>
            </Fade>
          </ClickAwayListener>
        )}
      </Popper>
    </div>
  );
}

Share.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.shape({}),
  link: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

Share.defaultProps = {
  children: undefined,
  classes: undefined,
  link: undefined,
  title: undefined,
  description: undefined,
};

export default Share;
