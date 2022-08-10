import { RichTypography } from "@commons-ui/core";
import Stack from "@mui/material/Stack";
import React from "react";

import {
  FacebookShareBarButton,
  LinkedinShareBarButton,
  TwitterShareBarButton,
} from "@/codeforafrica/components/ShareButtons";
import SocialMediaBar from "@/codeforafrica/components/SocialMediaBar";

const ShareThisPage = React.forwardRef(function ShareThisPage(props, ref) {
  const { children, sx, title, ...other } = props;
  return (
    <Stack
      direction="row"
      spacing="17px"
      {...other}
      sx={{
        color: "grey.main",
        alignItems: "center",
        ...sx,
      }}
      ref={ref}
    >
      <RichTypography variant="footerCap">{children || title}</RichTypography>
      <SocialMediaBar>
        <TwitterShareBarButton />
        <LinkedinShareBarButton />
        <FacebookShareBarButton />
      </SocialMediaBar>
    </Stack>
  );
});

export default ShareThisPage;
