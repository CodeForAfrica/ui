import { RichTypography } from "@commons-ui/core";
import Stack from "@mui/material/Stack";
import React from "react";

import ShareBar from "@/codeforafrica/components/ShareBar";
import {
  FacebookShareBarButton,
  LinkedinShareBarButton,
  TwitterShareBarButton,
} from "@/codeforafrica/components/ShareBarButton";

const ShareThisPage = React.forwardRef(function ShareThisPage(props, ref) {
  const { sx, title, ...other } = props;
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
      <ShareBar>
        <TwitterShareBarButton />
        <LinkedinShareBarButton />
        <FacebookShareBarButton />
      </ShareBar>
    </Stack>
  );
});

export default ShareThisPage;
