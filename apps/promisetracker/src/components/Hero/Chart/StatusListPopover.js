import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  Grid,
  Button,
  Dialog,
  Typography,
  IconButton,
  DialogContent,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import info from "@/promisetracker/assets/hero-icon-info.svg";

import config from "@/promisetracker/config";

const useStyles = makeStyles(({ palette, typography }) => ({
  typo: {
    color: palette.primary.main,
  },
  status: {
    borderBottom: `1px solid ${palette.secondary.main}`,
    padding: "0.5rem 0rem",
  },
  button: {
    borderRadius: typography.pxToRem(10),
    fontSize: typography.pxToRem(7),
  },
  iconButton: {
    background: palette.secondary.light,
    padding: "1.5rem",
    margin: "0.5rem",
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

function StatusListPopover(props) {
  const classes = useStyles(props);
  const { statuses } = config;
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
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
        PaperProps={{
          style: {
            borderRadius: 0,
            boxShadow: "0px 3px 6px #00000029",
          },
        }}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          What do the ratings mean?
        </DialogTitle>
        <DialogContent>
          {statuses.map((status) => (
            <Grid
              container
              direction="row"
              justify="space-bewtween"
              alignItems="center"
              className={classes.status}
            >
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  aria-label={status.name}
                  className={classes.button}
                >
                  {status.name}
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" className={classes.description}>
                  {status.description}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default StatusListPopover;
