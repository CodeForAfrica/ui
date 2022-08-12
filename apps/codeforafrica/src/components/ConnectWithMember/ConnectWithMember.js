import { RichTypography } from "@commons-ui/core";
import Stack from "@mui/material/Stack";
import React from "react";

import SocialMediaBar from "@/codeforafrica/components/SocialMediaBar";
import SocialMediaButton from "@/codeforafrica/components/SocialMediaButton";

const ConnectWithMember = React.forwardRef(function ConnectWithMember(
  props,
  ref
) {
  const { sx, title, links, ...other } = props;
  return links ? (
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
      <SocialMediaBar links={links}>
        {Object.entries(links).map(([key, value]) => {
          return <SocialMediaButton key={key} name={key} url={value} />;
        })}
      </SocialMediaBar>
    </Stack>
  ) : null;
});

export default ConnectWithMember;
