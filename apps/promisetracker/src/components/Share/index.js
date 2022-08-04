import {
  Grid,
  Fade,
  Paper,
  Popper,
  IconButton,
  SvgIcon,
  ClickAwayListener,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";

import useStyles from "./useStyles";

import FacebookIcon from "@/promisetracker/assets/footer-social-fb.svg";
import LinkedInIcon from "@/promisetracker/assets/footer-social-ln.svg";
import TwitterIcon from "@/promisetracker/assets/footer-social-tw.svg";

function Share({ link, title, description, children, ...props }) {
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
        disableFocusRipple
        disableRipple
        size="large"
      >
        {children}
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
                    <SvgIcon
                      component={TwitterIcon}
                      viewBox="0 0 20 16"
                      alt="Twitter"
                      classes={{
                        root: classes.svgIcon,
                      }}
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
                    <SvgIcon
                      component={FacebookIcon}
                      viewBox="0 0 10 20"
                      alt="Facebook"
                      classes={{
                        root: classes.svgIcon,
                      }}
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
                    <SvgIcon
                      component={LinkedInIcon}
                      viewBox="0 0 15.288 15.287"
                      alt="LinkedIn"
                      classes={{
                        root: classes.svgIcon,
                      }}
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
