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

import PromiseStatusList from "@/promisetracker/components/PromiseStatusList";

const useStyles = makeStyles(({ palette, typography }) => ({
  root: {
    overflowY: "auto",
  },
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

function MobileInfoStatusPopover({ items, title, ...props }) {
  const classes = useStyles(props);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  if (!(title?.length || items?.length)) {
    return null;
  }
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
        aria-labelledby="promise-ratings"
        onClose={handleClose}
        open={open}
        scroll="paper"
        classes={{ root: classes.root, paper: classes.paper }}
      >
        {title && (
          <DialogTitle id="promise-ratings" onClose={handleClose}>
            {title}
          </DialogTitle>
        )}
        {items?.length && (
          <DialogContent classes={{ root: classes.dialogContent }}>
            <PromiseStatusList
              items={items}
              classes={{ description: classes.description }}
            />
          </DialogContent>
        )}
      </Dialog>
    </Grid>
  );
}

MobileInfoStatusPopover.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
    })
  ),
  title: PropTypes.string,
};

MobileInfoStatusPopover.defaultProps = {
  items: undefined,
  title: undefined,
};

export default MobileInfoStatusPopover;
