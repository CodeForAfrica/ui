import { Box, Grid, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import React from "react";

import LocationHighlight from "@/hurumap/core/LocationHighlight";
import LocationTag from "@/hurumap/core/LocationTag";

const Location = React.forwardRef(function Location(
  { highlights, isLoading, tags, ...props },
  ref,
) {
  const theme = useTheme();
  return (
    <Grid
      container
      ref={ref}
      {...props}
      sx={{
        background: alpha("#FFFFFF", 0.9),
        borderRadius: theme.typography.pxToRem(5),
        bottom: "auto",
        boxShadow: `0px 3px 6px ${alpha("#000000", 0.16)}`,
        padding: `${theme.typography.pxToRem(4.12)} ${theme.typography.pxToRem(19)} ${theme.typography.pxToRem(12)} ${theme.typography.pxToRem(21)}`,
        width: theme.typography.pxToRem(600),
        ...props.sx,
      }}
    >
      <Grid item xs={12} container justifyContent="center">
        {tags.map((tag, index) => (
          <Grid
            item
            key={`${tag.level}-${tag.name}`}
            sx={{
              "&:not(:first-of-type)": {
                marginLeft: theme.typography.pxToRem(10),
              },
            }}
          >
            <LocationTag
              isLoading={isLoading}
              {...tag}
              active={index === tags.length - 1}
              variant="highlight"
            />
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12}>
        {highlights?.length > 0 ? (
          <Box
            display="flex"
            flexWrap="nowrap"
            justifyContent="center"
            sx={{
              borderTop: `1px solid ${theme.palette.grey.main}`,
              marginTop: 4.5,
              width: "100%",
            }}
          >
            {highlights.map((highlight) => (
              <LocationHighlight
                key={highlight.title}
                isLoading={isLoading}
                {...highlight}
                sx={{
                  paddingTop: "4.5px",
                  "&:not(:first-of-type)": {
                    borderLeft: `1px solid ${theme.palette.grey.main}`,
                  },
                }}
              />
            ))}
          </Box>
        ) : null}
      </Grid>
    </Grid>
  );
});

export default Location;
