import { RichTypography } from "@commons-ui/next";
import { Stack } from "@mui/material";
import React from "react";

const SocialMediaBar = React.forwardRef(function SocialMediaBar(props, ref) {
  const { sx, title, children, ...other } = props;
  return (
    <Stack
      spacing="17px"
      {...other}
      sx={{
        alignItems: "center",
        ...sx,
      }}
      ref={ref}
    >
      <RichTypography variant="p3">{title}</RichTypography>
      <Stack
        direction="row"
        spacing="17px"
        sx={{
          alignItems: "center",
        }}
      >
        {children}
      </Stack>
    </Stack>
  );
});

export default SocialMediaBar;
