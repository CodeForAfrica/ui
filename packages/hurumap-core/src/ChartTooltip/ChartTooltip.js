import { Box, Typography, Grid, useTheme } from "@mui/material";
import React, { forwardRef } from "react";

const ChartTooltip = forwardRef(function ChartTooltip(
  { title, value, formattedValue, item, ...props },
  ref,
) {
  const theme = useTheme();
  const { typography, palette } = theme;
  return (
    <Grid
      container
      ref={ref}
      style={{
        background: palette.grey.dark,
        boxShadow: "0px 3px 6px #00000029",
        borderRadius: theme.typography.pxToRem(4),
        opacity: 0.8,
        color: theme.palette.text.secondary,
        padding: theme.typography.pxToRem(12.5),
        paddingRight: 0,
        display: "inline-block",
        width: "fit-content",
      }}
    >
      {item && (
        <Grid
          item
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            style={{
              width: theme.typography.pxToRem(10),
              height: theme.typography.pxToRem(10),
              border: `1px solid ${theme.palette.background.default}`,
              background: props.itemColor,
              borderRadius: "100%",
              marginRight: theme.typography.pxToRem(7),
            }}
          />
          <Typography
            style={{
              fontSize: typography.pxToRem(11),
            }}
          >
            {item}
          </Typography>
        </Grid>
      )}
      <Grid
        item
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          variant="body2"
          component="div"
          style={{
            marginRight: typography.pxToRem(12.5),
            maxWidth: typography.pxToRem(148),
          }}
        >
          {title}
        </Typography>
        {formattedValue && (
          <Typography
            variant="body2"
            component="div"
            style={{
              marginRight: typography.pxToRem(12.5),
              maxWidth: typography.pxToRem(148),
            }}
          >
            {formattedValue}
          </Typography>
        )}
        <Typography
          variant="body2"
          component="div"
          style={{
            marginRight: typography.pxToRem(12.5),
            maxWidth: typography.pxToRem(148),
          }}
        >
          {value}
        </Typography>
      </Grid>
    </Grid>
  );
});

export default ChartTooltip;
