import { RichTypography } from "@commons-ui/core";
import Stack from "@mui/material/Stack";
import React from "react";

import SocialMediaButton from "@/codeforafrica/components/SocialMediaButton";
import SocialMediaButtonGroup from "@/codeforafrica/components/SocialMediaButtonGroup";

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
      <SocialMediaButtonGroup links={links}>
        {Object.entries(links).map(([key, value]) => {
          return <SocialMediaButton key={key} name={key} url={value} />;
        })}
      </SocialMediaButtonGroup>
    </Stack>
  ) : null;
});

export default ConnectWithMember;
