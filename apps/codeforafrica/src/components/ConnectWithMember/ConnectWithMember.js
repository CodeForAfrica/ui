import { RichTypography } from "@commons-ui/core";
import Stack from "@mui/material/Stack";
import React from "react";

import ConnectBar from "@/codeforafrica/components/ConnectBar";
import SocialMediaConnectButton from "@/codeforafrica/components/SocialMediaConnectButton";

const ConnectWithMember = React.forwardRef(function ConnectWithMember(
  props,
  ref
) {
  const { sx, title, links, ...other } = props;
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
      <ConnectBar links={links}>
        {Object.entries(links).map(([key, value]) => {
          return <SocialMediaConnectButton key={key} type={key} url={value} />;
        })}
      </ConnectBar>
    </Stack>
  );
});

export default ConnectWithMember;
