import Stack from "@mui/material/Stack";
import React from "react";

const SocialMediaButtonGroup = React.forwardRef(function SocialMediaButtonGroup(
  props,
  ref
) {
  return <Stack direction="row" spacing="17px" {...props} ref={ref} />;
});

export default SocialMediaButtonGroup;
