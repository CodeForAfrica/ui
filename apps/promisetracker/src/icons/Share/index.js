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
        d="M336.8,3168.5a1.6,1.6,0,1,1,1.6-1.6,1.6,1.6,0,0,1-1.6,1.6m-9.6,4.9a1.6,1.6,0,0,1,0-3.2,1.6,1.6,0,0,1,0,3.2m0-9.6a1.6,1.6,0,0,1,0-3.2,1.6,1.6,0,0,1,0,3.2m9.6-.1a3.181,3.181,0,0,0-2.427,1.137l-4.006-2.312a3.177,3.177,0,1,0-.562,1.523l3.858,2.227a3.15,3.15,0,0,0,.007,1.289l-3.958,2.278a3.195,3.195,0,1,0,.638,1.479l4.045-2.327a3.195,3.195,0,1,0,2.4-5.292"
        transform="translate(-324 -3159)"
      />
    </SvgIcon>
  );
}

export default ShareIcon;
