import { Box, Typography } from "@mui/material";
import React from "react";

const LocationHighlight = React.forwardRef(function LocationHighlight(
  {
    TitleTypographyProps,
    ValueTypographyProps,
    isLoading,
    title,
    value,
    ...props
  },
  ref,
) {
  return (
    <Box
      alignItems="center"
      display="inline-flex"
      flexDirection="column"
      flexGrow={1}
      {...props}
      ref={ref}
    >
      <Typography
        variant="subtitle1"
        {...TitleTypographyProps}
        sx={(theme) => ({
          fontSize: theme.typography.pxToRem(10),
          fontWeight: 300,
          lineHeight: 24 / 10,
          textTransform: "uppercase",
          ...TitleTypographyProps?.sx,
        })}
      >
        {title}
      </Typography>
      <Typography variant="body2" {...ValueTypographyProps}>
        {isLoading ? "…" : value}
      </Typography>
    </Box>
  );
});

export default LocationHighlight;
