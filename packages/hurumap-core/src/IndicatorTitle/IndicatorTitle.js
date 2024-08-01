import { RichTypography } from "@commons-ui/core";
import { Box, Grid } from "@mui/material";
import React from "react";

import Action from "@/hurumap/core/Action";

const IndicatorTitle = React.forwardRef(function IndicatorTitle(
  { children, actions = [], description, disableToggle, title, view, ...props },
  ref,
) {
  return (
    <Box
      {...props}
      sx={(theme) => ({
        paddingTop: theme.typography.pxToRem(24),
        paddingBottom: theme.typography.pxToRem(25),
        ...props.sx,
      })}
      ref={ref}
    >
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs={12} md={8}>
          <RichTypography variant="h6">{children || title}</RichTypography>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          container
          sx={(theme) => ({
            justifyContent: "flex-start",
            marginTop: theme.typography.pxToRem(20),
            marginBottom: theme.typography.pxToRem(20),
            [theme.breakpoints.up("md")]: {
              justifyContent: "flex-end",
              margin: 0,
            },
          })}
        >
          {actions
            .filter((a) => a?.id)
            .map((act) => (
              <Grid
                item
                key={act.id}
                sx={(theme) => ({
                  marginRight: theme.typography.pxToRem(14),
                  "&:last-of-type": {
                    marginRight: 0,
                  },
                })}
              >
                <Action {...act} />
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Box>
  );
});

export default IndicatorTitle;
