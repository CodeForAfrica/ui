import React, { useState } from "react";

import PropTypes from "prop-types";

import {
  Grid,
  Dialog,
  Typography,
  IconButton,
  DialogContent,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";

import info from "@/promisetracker/assets/hero-icon-info.svg";

import DialogPromiseStatusList from "@/promisetracker/components/Hero/ProfileChart/DialogPromiseStatusList";

import config from "@/promisetracker/config";

const useStyles = makeStyles(({ palette, typography }) => ({
  closeButton: {
    color: palette.primary.main,
    position: "absolute",
    // has padding of 12px and we want it to align at 10px on the right
    right: "-2px",
    top: 0,
  },
  description: {
    fontSize: typography.pxToRem(10),
  },
  dialogContent: {
    padding: `${typography.pxToRem(16)} ${typography.pxToRem(10)}`,
  },
  iconButton: {},
  paper: {
    borderRadius: 0,
    boxShadow: "0px 3px 6px #00000029",
    margin: `0 ${typography.pxToRem(13)}`,
    maxWidth: "100%",
    overflow: "hidden",
    position: "absolute",
    top: typography.pxToRem(211),
  },
  status: {
    borderBottom: `1px solid ${palette.secondary.main}`,
    padding: "0.5rem 0rem",
  },
  title: {
    color: palette.primary.main,
  },
}));

function DialogTitle({ children, onClose, ...other }) {
  const classes = useStyles();
  return (
    <MuiDialogTitle
      disableTypography
      classes={{ root: classes.dialogContent }}
      {...other}
    >
      <Typography variant="h5" className={classes.title}>
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          disableRipple
          disableFocusRipple
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
}

DialogTitle.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

function MobileInfoStatusPopover({ title, ...props }) {
  const classes = useStyles(props);
  const { promiseStatuses } = config;
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid item>
      <IconButton
        disableRipple
        disableFocusRipple
        aria-label="Info"
        size="small"
        onClick={handleClickOpen}
        className={classes.iconButton}
      >
        <img src={info} alt="Info" />
      </IconButton>

      <Dialog
        classes={{ paper: classes.paper }}
        onClose={handleClose}
        aria-labelledby="promise-ratings"
        open={open}
      >
        <DialogTitle id="promise-ratings" onClose={handleClose}>
          {title}
        </DialogTitle>
        <DialogContent classes={{ root: classes.dialogContent }}>
          <DialogPromiseStatusList
            items={promiseStatuses}
            classes={{ description: classes.description }}
          />
        </DialogContent>
      </Dialog>
    </Grid>
  );
}

MobileInfoStatusPopover.propTypes = {
  title: PropTypes.string.isRequired,
};

export default MobileInfoStatusPopover;
