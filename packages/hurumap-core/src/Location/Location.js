import { Box, Grid } from "@mui/material";
import { alpha } from "@mui/material/styles";
import React from "react";

import LocationHighlight from "@/hurumap/core/LocationHighlight";
import LocationTag from "@/hurumap/core/LocationTag";

const Location = React.forwardRef(function Location(props, ref) {
  const { highlights, isLoading, tags, ...others } = props;

  return (
    <Grid
      container
      ref={ref}
      {...others}
      sx={(theme) => ({
        background: alpha(theme.palette.background.default, 0.9),
        // match zoom control border color
        border: "1px solid #ccc",
        borderRadius: theme.typography.pxToRem(5),
        bottom: "auto",
        boxShadow: `0px 3px 6px ${alpha("#000000", 0.16)}`,
        padding: `${theme.typography.pxToRem(4.12)} ${theme.typography.pxToRem(19)} ${theme.typography.pxToRem(12)} ${theme.typography.pxToRem(21)}`,
        width: theme.typography.pxToRem(600),
        ...props.sx,
      })}
    >
      <Grid item xs={12} container justifyContent="center">
        {tags.map((tag, index) => (
          <Grid
            item
            key={`${tag.level}-${tag.name}`}
            sx={(theme) => ({
              "&:not(:first-of-type)": {
                marginLeft: theme.typography.pxToRem(10),
              },
            })}
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
            sx={(theme) => ({
              borderTop: `1px solid ${theme.palette.grey.main}`,
              marginTop: 4.5,
              width: "100%",
            })}
          >
            {highlights.map((highlight) => (
              <LocationHighlight
                key={highlight.title}
                isLoading={isLoading}
                {...highlight}
                sx={(theme) => ({
                  paddingTop: "4.5px",
                  "&:not(:first-of-type)": {
                    borderLeft: `1px solid ${theme.palette.grey.main}`,
                  },
                })}
              />
            ))}
          </Box>
        ) : null}
      </Grid>
    </Grid>
  );
});

export default Location;
