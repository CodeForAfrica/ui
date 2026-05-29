import { Box } from "@mui/material";
import React from "react";

import ImageButton from "@/commons-ui/core/ImageButton";
import RichTypography from "@/commons-ui/core/RichTypography";

const Copyright = React.forwardRef(function Copyright(props, ref) {
  const {
    copyright,
    TypographyProps,
    icon,
    IconProps,
    variant,
    year,
    url,
    sx,
  } = props;

  return (
    <Box sx={sx} ref={ref}>
      <RichTypography variant={variant} {...TypographyProps}>
        {copyright}
      </RichTypography>
      {icon && url && (
        <ImageButton
          src={icon}
          alt={copyright}
          width={24}
          height={24}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          {...IconProps}
        />
      )}
      {year && (
        <RichTypography variant={variant} {...TypographyProps}>
          {year}
        </RichTypography>
      )}
    </Box>
  );
});

export default Copyright;
