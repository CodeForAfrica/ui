import React from "react";

import { Grid, IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";

import info from "@/promisetracker/assets/hero-icon-info.svg";

const useStyles = makeStyles(() => ({
  typography: {
    padding: "2rem",
  },
  iconButton: {
    background: "#F7F7F7",
    padding: "1.5rem",
    margin: "0.5rem",
  },
  popover: {
    border: "1px solid #EBEBEB",
    borderRadius: 0,
    padding: "2rem",
  },
  closeButton: {
    "&:hover": {
      background: "unset",
    },
  },
  closeIcon: {
    color: "#EBEBEB",
  },
  ".MuiPopover-paper": {
    width: "665px",
  },
}));

function StatusPopperButton() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : null;
  return (
    <>
      <IconButton
        aria-describedby={id}
        disableRipple
        disableFocusRipple
        aria-label="Viz2"
        size="small"
        onClick={handleClick}
        className={classes.iconButton}
      >
        <img src={info} alt="Viz1" />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        className={classes.popover}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
      >
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Typography variant="h5">What do the ratings mean?</Typography>
          <IconButton
            disableRipple
            disableFocusRipple
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}
          >
            <CloseIcon className={classes.closeIcon} onClick={handleClose} />
          </IconButton>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          style={{ borderBottom: "1px solid grey" }}
        >
          <Typography variant="h6"> this is an example</Typography>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          style={{ borderBottom: "1px solid grey" }}
        >
          <Typography variant="h6"> this is an example</Typography>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          style={{ borderBottom: "1px solid grey" }}
        >
          <Typography variant="h6"> this is an example</Typography>
        </Grid>
      </Popover>
    </>
  );
}

export default StatusPopperButton;
