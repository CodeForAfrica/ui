import { RichTypography } from "@commons-ui/core";
import Stack from "@mui/material/Stack";
import React from "react";

import SocialMediaButtonGroup from "@/codeforafrica/components/SocialMediaButtonGroup";

const SocialMediaBar = React.forwardRef(function SocialMediaBar(props, ref) {
  const { sx, title, children, ...other } = props;
  return (
    <Stack
      direction="row"
      {...other}
      sx={{
        color: "grey.main",
        alignItems: "center",
        ...sx,
      }}
      ref={ref}
    >
      <RichTypography variant="footerCap">{title}</RichTypography>
      <SocialMediaButtonGroup>{children}</SocialMediaButtonGroup>
    </Stack>
  );
});

export default SocialMediaBar;
