import { Stack } from "@mui/material";
import React from "react";

import RichTypography from "@/commons-ui/next/RichTypography";

function EmbedCodeRoot(props) {
  return <RichTypography {...props} />;
}

const HtmlEmbed = React.forwardRef(function HTMLEmbed(props, ref) {
  const {
    children: childrenProp,
    embedCode,
    sx,
    title,
    EmbedCodeProps = {},
  } = props;
  const children = childrenProp || embedCode;

  if (!children) {
    return null;
  }
  return (
    <Stack
      sx={[
        {
          maxWidth: { md: "200px" },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      ref={ref}
    >
      <RichTypography variant="h5SemiBold" sx={{ mb: "30px" }}>
        {title}
      </RichTypography>
      <EmbedCodeRoot {...EmbedCodeProps}>{children}</EmbedCodeRoot>
    </Stack>
  );
});

export default HtmlEmbed;
