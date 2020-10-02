import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import radar from "@/promisetracker/assets/promisepage-map-mockup.svg";

const useStyles = makeStyles(({ typography, breakpoints }) => ({
  root: {
    alignItems: "center",
    display: "flex",
    marginBottom: "2rem",
  },

  radar: {
    width: "100%",
    objectFit: "cover",
    height: typography.pxToRem(256),
    [breakpoints.up("lg")]: {
      width: typography.pxToRem(256),
    },
  },
}));

function Radar(props) {
  const classes = useStyles({ props });

  return (
    <div className={classes.root}>
      <img src={radar} alt="radar" className={classes.radar} />
    </div>
  );
}

export default Radar;
