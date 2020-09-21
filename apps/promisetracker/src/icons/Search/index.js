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
    <SvgIcon htmlColor="#202020" {...props}>
      <path
        className={classes.root}
        d="M264,138.586,262.515,140l-4.455-4.242,1.485-1.415ZM251.4,134a6.007,6.007,0,1,1,6.3-6,6.162,6.162,0,0,1-6.3,6Zm0-14a8.01,8.01,0,1,0,8.4,8,8.208,8.208,0,0,0-8.4-8Z"
        transform="translate(-243 -120)"
      />
    </SvgIcon>
  );
}

export default ShareIcon;
