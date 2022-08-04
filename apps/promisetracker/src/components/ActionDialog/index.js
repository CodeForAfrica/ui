import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

function ActionDialog({
  children,
  description,
  name: nameProp,
  onClose,
  title,
  ...props
}) {
  const classes = useStyles(props);

  if (!children) {
    return null;
  }
  const name = `${nameProp || "action"}-dialog`;
  return (
    <Dialog
      {...props}
      maxWidth={false}
      onClose={onClose}
      scroll="body"
      aria-labelledby={title?.length ? `${name}-title` : undefined}
      aria-describedby={description?.length ? `${name}-description` : undefined}
      PaperProps={{
        square: true,
      }}
      classes={{
        root: classes.root,
        paper: classes.paper,
        paperScrollBody: classes.paperScrollBody,
        scrollBody: classes.scrollBody,
      }}
    >
      {title?.length ? (
        <DialogTitle id={`${name}-title`} className={classes.title}>
          {onClose ? (
            <IconButton
              disableRipple
              disableFocusRipple
              aria-label="close"
              onClick={onClose}
              className={classes.closeButton}
              size="large"
            >
              <CloseIcon className={classes.closeIcon} />
            </IconButton>
          ) : null}
          <Typography variant="h4" component="h2">
            {title}
          </Typography>
        </DialogTitle>
      ) : null}
      {description?.length ? (
        <DialogContent className={classes.content}>
          <DialogContentText
            id={`${name}-description`}
            variant="body2"
            align="center"
            className={classes.description}
          >
            {description}
          </DialogContentText>
        </DialogContent>
      ) : null}
      {children}
    </Dialog>
  );
}

ActionDialog.propTypes = {
  children: PropTypes.node,
  description: PropTypes.string,
  name: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string,
};

ActionDialog.defaultProps = {
  children: undefined,
  description: undefined,
  name: undefined,
  onClose: undefined,
  open: undefined,
  title: undefined,
};

export default ActionDialog;
