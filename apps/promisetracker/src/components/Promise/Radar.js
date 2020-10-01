import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import radar from "@/promisetracker/assets/promisepage-map-mockup.svg";

const useStyles = makeStyles(({ typography }) => ({
  root: {
    alignItems: "center",
    display: "flex",
  },

  radar: {
    width: typography.pxToRem(256),
    height: typography.pxToRem(256),
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
