import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";

import connector from "@/promisetracker/assets/ic-connector.svg";
import petition from "@/promisetracker/assets/ic-message.svg";
import notification from "@/promisetracker/assets/ic-notification.svg";
import share from "@/promisetracker/assets/ic-share.svg";
import Connect from "./Connect";
import Petition from "./Petition";
import Share from "./Share";
import Update from "./Update";

const useStyles = makeStyles(({ typography, palette }) => ({
  label: {
    color: "#005DFD",
  },
  title: {
    marginBootom: typography.pxToRem(26),
  },
  button: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  close: {
    position: "absolute",
    top: 0,
    right: 0,
    marginRight: ".5rem",
    marginTop: ".5rem",
    cursor: "pointer",
  },
  icon: {
    height: "1.25rem",
    width: "1.25rem",
  },
  item: {
    background: palette.secondary.main,
    width: "7.5rem",
    height: "7.5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "0rem 1rem",
    borderRadius: typography.pxToRem(10),
    cursor: "pointer",
  },
  itemsContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    marginTop: "1rem",
  },
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 3px 6px #00000029",
    border: "1px solid #EBEBEB",
    borderRadius: typography.pxToRem(10),
    padding: "22px 29px 29px 29px",
    margin: "1.5rem 0rem",
    position: "relative",
  },
}));
function CallToAction({ title, items, ...props }) {
  const classes = useStyles(props);
  const [selected, setSelected] = useState();

  return (
    <div className={classes.root}>
      {!selected && (
        <>
          <Typography variant="h4">{title}</Typography>
          <div className={classes.itemsContainer}>
            {items.map((item) => (
              <Button
                variant="text"
                key={item.label}
                onClick={() => setSelected(item)}
                classes={{ root: classes.item, label: classes.button }}
              >
                <img
                  alt={item.label}
                  className={classes.icon}
                  src={item.icon}
                />

                <Typography className={classes.label} variant="h6">
                  {item.label}
                </Typography>
              </Button>
            ))}
          </div>
        </>
      )}
      {selected && (
        <>
          <Button
            variant="text"
            className={classes.close}
            onClick={() => setSelected()}
          >
            X
          </Button>
          {selected.component}
        </>
      )}
    </div>
  );
}

CallToAction.propTypes = {
  classes: PropTypes.shape({
    itemsContainer: PropTypes.string,
  }),
  items: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.string,
  selected: PropTypes.string,
};

CallToAction.defaultProps = {
  classes: undefined,
  items: [
    {
      icon: connector,
      label: "Connect",
      component: <Connect />,
    },
    {
      icon: petition,
      label: "Petition",
      component: <Petition />,
    },
    {
      icon: notification,
      label: "Update",
      component: <Update />,
    },
    {
      icon: share,
      label: "Share",
      component: <Share />,
    },
  ],
  title: "Act Now",
  selected: undefined,
};

export default CallToAction;
