import Stack from "@mui/material/Stack";
import React from "react";

const ConnectBar = React.forwardRef(function ConnectBar(props, ref) {
  return <Stack direction="row" spacing="17px" {...props} ref={ref} />;
});

export default ConnectBar;
