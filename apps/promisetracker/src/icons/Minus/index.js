import React from "react";

import { SvgIcon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    fillRule: "evenodd",
  },
}));

function ShareIcon(props) {
  const classes = useStyles(props);

  return (
    <SvgIcon htmlColor="#202020" viewBox="0 0 21 20" {...props}>
      <path className={classes.root} d="M19 13H5v-2h14v2z" />
    </SvgIcon>
  );
}

export default ShareIcon;
