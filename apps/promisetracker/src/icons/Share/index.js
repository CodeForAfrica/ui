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
    <SvgIcon htmlColor="#909090" {...props}>
      <path
        className={classes.root}
        d="M340,3170.875a2,2,0,1,1,2-2,2,2,0,0,1-2,2M328,3177a2,2,0,0,1,0-4,2,2,0,0,1,0,4m0-12a2,2,0,0,1,0-4,2,2,0,0,1,0,4m12-.125a3.975,3.975,0,0,0-3.034,1.421l-5.007-2.891a3.971,3.971,0,1,0-.7,1.9l4.822,2.784a3.939,3.939,0,0,0,.009,1.611l-4.947,2.847a3.993,3.993,0,1,0,.8,1.848l5.056-2.909a3.993,3.993,0,1,0,3.005-6.615"
        transform="translate(-324 -3159)"
      />
    </SvgIcon>
  );
}

export default ShareIcon;
