import Stack from "@mui/material/Stack";
import React from "react";

const ShareBar = React.forwardRef(function ShareBar(props, ref) {
  return <Stack direction="row" spacing="17px" {...props} ref={ref} />;
});

export default ShareBar;
