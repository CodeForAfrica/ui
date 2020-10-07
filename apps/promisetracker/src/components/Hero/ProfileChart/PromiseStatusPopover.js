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

const useStyles = makeStyles(({ palette, typography, breakpoints }) => ({
  typo: {
    color: palette.primary.main,
  },
  status: {
    borderBottom: `1px solid ${palette.secondary.main}`,
    padding: "0.5rem 0rem",
  },
  iconButton: {
    background: palette.secondary.light,
    padding: "1rem",
  },
  closeButton: {
    position: "absolute",
    right: "1rem",
    top: 0,
    color: palette.primary.main,
  },
  description: {
    fontSize: typography.pxToRem(10),
  },
  paper: {
    borderRadius: 0,
    boxShadow: "0px 3px 6px #00000029",
    position: "absolute",
    top: "1",
    maxWidth: "100%",
    [breakpoints.up("lg")]: {
      top: 0,
    },
  },
}));

function DialogTitle({ children, onClose, ...other }) {
  const classes = useStyles();
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h5" className={classes.typo}>
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

function PromiseStatusPopover(props) {
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
    <Grid item xs={3}>
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
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          What do the ratings mean?
        </DialogTitle>
        <DialogContent>
          <DialogPromiseStatusList
            items={promiseStatuses}
            classes={{ root: classes.criteriaItems }}
          />
        </DialogContent>
      </Dialog>
    </Grid>
  );
}
export default PromiseStatusPopover;
