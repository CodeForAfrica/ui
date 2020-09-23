import React, { useState } from "react";

import PropTypes from "prop-types";

import {
  Grid,
  Button,
  Dialog,
  IconButton,
  DialogTitle,
  DialogContent,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";

import info from "@/promisetracker/assets/hero-icon-info.svg";

import config from "@/promisetracker/config";

const useStyles = makeStyles(() => ({
  root: {},
  button: {},
  status: {
    padding: "1rem",
    borderBottom: "1px solid #ebebeb",
  },
  iconButton: {
    background: "#F7F7F7",
    padding: "1.5rem",
    margin: "0.5rem",
  },
  closeButton: {
    position: "absolute",
    right: "1rem",
    top: "1rem",
    color: "grey",
  },
}));
function StatusListPopover({ onClose, ...props }) {
  const classes = useStyles(props);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const { statuses } = config;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
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
      {!isDesktop ? (
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle
            disableTypography
            className={classes.root}
            onClose={handleClose}
          >
            <Typography variant="h3">What do the ratings mean</Typography>
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
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
                    {status.name || status}
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{status.description}</Typography>
                </Grid>
              </Grid>
            ))}
          </DialogContent>
        </Dialog>
      ) : (
        <div>example here</div>
      )}
    </div>
  );
}

StatusListPopover.propTypes = {
  name: PropTypes.oneOf([
    "completed",
    "in-progress",
    "stalled",
    "delayed",
    "unrated",
    "unstarted",
    "",
    undefined,
    null,
  ]).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default StatusListPopover;
