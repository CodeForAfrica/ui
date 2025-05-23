import { Stack } from "@mui/material";
import React from "react";

import RichTypography from "@/commons-ui/next/RichTypography";

function HTMLEmbedRoot(props) {
  return <RichTypography {...props} />;
}

/**
 * Section is a special Container that uses theme.contentWidths to set the
 * max-width of the container instead of using the full breakpoints values.
 * This is only applicable when fixed is true.
 */
const HTMLEmbed = React.forwardRef(function HTMLEmbed(props, ref) {
  const {
    children: childrenProp,
    embedCode,
    sx,
    htmlEmbedStyles,
    title,
  } = props;
  const children = childrenProp || embedCode;

  if (!children) {
    return null;
  }
  return (
    <Stack
      sx={{
        maxWidth: { md: "200px" },
        ...sx,
      }}
      ref={ref}
    >
      <RichTypography variant="h5SemiBold" sx={{ mb: "30px" }}>
        {title}
      </RichTypography>
      <HTMLEmbedRoot sx={htmlEmbedStyles}>{children}</HTMLEmbedRoot>
    </Stack>
  );
});

export default HTMLEmbed;
