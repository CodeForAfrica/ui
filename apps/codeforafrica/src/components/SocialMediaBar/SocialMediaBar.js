import Stack from "@mui/material/Stack";
import React from "react";

const SocialMediaBar = React.forwardRef(function SocialMediaBar(props, ref) {
  return <Stack direction="row" spacing="17px" {...props} ref={ref} />;
});

export default SocialMediaBar;
