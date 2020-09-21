import React from "react";

import { SvgIcon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  a: {
    fill: "#909090",
    fillRule: "evenodd",
  },
}));

function ShareIcon(props) {
  const classes = useStyles(props);

  return (
    <SvgIcon viewBox="0 0 21 20" {...props}>
      <path
        className={classes.a}
        d="M344,2h-9.45h-2.1H323h9.45h2.1Z"
        transform="translate(-323 -80)"
      />
    </SvgIcon>
  );
}

export default ShareIcon;
