import { RichTypography } from "@commons-ui/core";
import {
  Popper,
  Fade,
  Paper,
  ButtonBase,
  Typography,
  IconButton,
  Backdrop,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import PropTypes from "prop-types";
import React, { useState } from "react";

import { ReactComponent as HelpIcon } from "@/twoopstracker/assets/icons/help-circle.svg";

const useStyles = makeStyles(
  ({ breakpoints, palette, typography, zIndex }) => ({
    root: {},
    popper: {
      zIndex: zIndex.modal + 2,
    },
    paper: {
      background: "f7f7f7",
      borderRadius: 0,
      margin: typography.pxToRem(30),
      padding: typography.pxToRem(30),
      [breakpoints.up("md")]: {
        width: typography.pxToRem(640),
      },
      [breakpoints.up("lg")]: {
        margin: `${typography.pxToRem(16)} ${typography.pxToRem(33)} 0 0`,
        width: typography.pxToRem(795),
      },
    },
    title: {
      fontFamily: typography.body1.fontFamily,
      marginBottom: typography.pxToRem(44),
      fontWeight: "normal",
    },
    button: {
      padding: 0,
    },
    buttonBase: {
      display: "block",
      textAlign: "left",
    },
    backdrop: {
      zIndex: zIndex.modal + 1,
      overflow: "hidden",
      color: "#fff",
    },
    description: {
      background: palette.background.default,
      padding: typography.pxToRem(10),
    },
  }),
);

function SearchGuide({ title, description, ...props }) {
  const classes = useStyles(props);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!(title && description)) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Backdrop
        open={Boolean(anchorEl)}
        className={classes.backdrop}
        onClick={handleClose}
      />
      <IconButton
        onClick={handleClick}
        aria-describedby="aria-search-help"
        className={classes.button}
        size="large"
      >
        <HelpIcon />
      </IconButton>
      <Popper
        {...props}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        className={classes.popper}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <Paper className={classes.paper}>
              <ButtonBase
                component={ButtonBase}
                onClick={handleClose}
                className={classes.buttonBase}
              >
                <Typography variant="h4" className={classes.title}>
                  {title}
                </Typography>
                <RichTypography variant="body2" className={classes.description}>
                  {description}
                </RichTypography>
              </ButtonBase>
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  );
}

SearchGuide.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

SearchGuide.defaultProps = {
  title: undefined,
  description: undefined,
};

export default SearchGuide;
