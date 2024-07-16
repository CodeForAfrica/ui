import { Box, Typography } from "@mui/material";
import React from "react";

const LocationHighlight = React.forwardRef(function LocationHighlight(
  {
    TitleTypographyProps,
    ValueTypographyProps,
    title,
    value,
    isLoading,
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
      ref={ref}
      {...props}
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
