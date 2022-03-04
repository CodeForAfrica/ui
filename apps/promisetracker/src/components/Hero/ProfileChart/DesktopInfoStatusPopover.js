import { RichTypography } from "@commons-ui/core";
import { Paper, Fade, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

import info from "@/promisetracker/assets/hero-icon-info.svg";
import PromiseStatusList from "@/promisetracker/components/PromiseStatusList";

const useStyles = makeStyles(({ palette, typography }) => ({
  iconGrid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
  },
  infoIcon: {},
  iconButton: {},
  closeButton: {
    position: "absolute",
    right: "1rem",
    top: 10,
    color: palette.secondary.main,
  },
  paper: {
    position: "absolute",
    top: "0",
    // Make it higher than any other component on the page
    zIndex: 1,
    left: 0,
    height: "32.5rem",
    overflowY: "auto",
    width: "41.5rem",
  },
  paperTitle: {
    padding: "1.5rem",
  },
  paperContent: {
    padding: "1rem 2rem",
  },
  typo: {
    color: palette.primary.main,
  },
  description: {
    fontSize: typography.pxToRem(13),
  },
}));
function PaperTitle({ children, onClose, ...other }) {
  const classes = useStyles();

  return (
    <div className={classes.paperTitle} {...other}>
      <RichTypography variant="h5" className={classes.typo}>
        {children}
      </RichTypography>
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
    </div>
  );
}

PaperTitle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onClose: PropTypes.func,
};

PaperTitle.defaultProps = {
  onClose: undefined,
};

function PaperContent({ children, ...other }) {
  const classes = useStyles();
  return (
    <div className={classes.paperContent} {...other}>
      {children}
    </div>
  );
}

PaperContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

function DesktopInfoStatusPopover({ items, title, ...props }) {
  const classes = useStyles(props);
  const [open, setOpen] = React.useState(false);
  const handleChange = () => {
    setOpen((prev) => !prev);
  };
  const handleClose = () => {
    setOpen(false);
  };

  if (!(title?.length || items?.length)) {
    return null;
  }
  return (
    <div>
      <IconButton
        disableRipple
        disableFocusRipple
        aria-label="Info"
        size="small"
        open={open}
        onClick={handleChange}
        className={classes.iconButton}
      >
        <Image
          src={info}
          alt="Info"
          className={classes.infoIcon}
          width={11}
          height={22}
        />
      </IconButton>
      <Fade in={open}>
        <Paper elevation={4} className={classes.paper}>
          {title?.length && (
            <PaperTitle onClose={handleClose}>{title}</PaperTitle>
          )}
          {items?.length && (
            <PaperContent>
              <PromiseStatusList
                items={items}
                classes={{ description: classes.description }}
              />
            </PaperContent>
          )}
        </Paper>
      </Fade>
    </div>
  );
}

DesktopInfoStatusPopover.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
    })
  ),
  title: PropTypes.string,
};

DesktopInfoStatusPopover.defaultProps = {
  items: undefined,
  title: undefined,
};

export default DesktopInfoStatusPopover;
