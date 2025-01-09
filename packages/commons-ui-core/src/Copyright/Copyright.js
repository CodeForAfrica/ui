import { Box, Typography } from "@mui/material";
import React from "react";

const Copyright = React.forwardRef(function Copyright(props, ref) {
  const {
    copyright,
    CopyrightProps,
    icon,
    IconProps,
    variant,
    year,
    YearProps,
    url,
    sx,
  } = props;

  return (
    <Box sx={sx} ref={ref}>
      {copyright && (
        <Typography variant={variant} {...CopyrightProps}>
          {copyright}
        </Typography>
      )}
      {icon && (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <image
            src={icon}
            alt={copyright}
            width={24}
            height={24}
            {...IconProps}
          />
        </a>
      )}
      {year && (
        <Typography variant={variant} {...YearProps}>
          {year}
        </Typography>
      )}
    </Box>
  );
});

export default Copyright;
