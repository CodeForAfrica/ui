import { Box, Grid, styled, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import React from "react";

import LocationHighlight from "@/hurumap/core/LocationHighlight";
import LocationTag from "@/hurumap/core/LocationTag";

const LocationRoot = styled(Grid)(({ theme }) => {
  const { typography } = theme;

  return {
    background: alpha("#FFFFFF", 0.9),
    borderRadius: typography.pxToRem(5),
    bottom: "auto",
    boxShadow: `0px 3px 6px ${alpha("#000000", 0.16)}`,
    padding: `${typography.pxToRem(4.12)} ${typography.pxToRem(19)} ${typography.pxToRem(12)} ${typography.pxToRem(21)}`,
    width: typography.pxToRem(600),
  };
});

const HighlightRoot = styled(Box)(({ theme }) => {
  return {
    borderTop: `1px solid ${theme.palette.grey.main}`,
    marginTop: 4.5,
    width: "100%",
  };
});

const Location = React.forwardRef(function Location(
  { highlights, isLoading, tags, ...props },
  ref,
) {
  const theme = useTheme();
  return (
    <LocationRoot container ref={ref} {...props}>
      <Grid item xs={12}>
        <Grid container justifyContent="center">
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
      </Grid>
      <Grid item xs={12}>
        {highlights?.length > 0 ? (
          <HighlightRoot
            display="flex"
            flexWrap="nowrap"
            justifyContent="center"
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
          </HighlightRoot>
        ) : null}
      </Grid>
    </LocationRoot>
  );
});

export default Location;
