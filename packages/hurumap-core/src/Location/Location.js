import { Box, styled } from "@mui/material";
import { alpha } from "@mui/material/styles";
import React from "react";

import LocationHighlight from "@/hurumap/core/LocationHighlight";
import LocationTag from "@/hurumap/core/LocationTag";

const LocationRoot = styled(Box)(({ theme }) => {
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
  {
    HighlightRootProps,
    LocationHighlightProps,
    LocationTagProps,
    LocationTagRootProps,
    highlights,
    isLoading,
    tags,
    ...props
  },
  ref,
) {
  return (
    <LocationRoot
      display="flex"
      flexDirection="column"
      alignItems="center"
      ref={ref}
      {...props}
    >
      <Box
        display="flex"
        flexWrap="nowrap"
        justifyContent="center"
        {...LocationTagRootProps}
      >
        {tags.map((tag, index) => (
          <LocationTag
            key={`${tag.level}-${tag.name}`}
            isLoading={isLoading}
            {...tag}
            active={index === tags.length - 1}
            variant="highlight"
            {...LocationTagProps}
          />
        ))}
      </Box>
      {highlights?.length > 0 ? (
        <HighlightRoot
          display="flex"
          flexWrap="nowrap"
          justifyContent="center"
          {...HighlightRootProps}
        >
          {highlights.map((highlight) => (
            <LocationHighlight
              key={highlight.title}
              isLoading={isLoading}
              {...highlight}
              {...LocationHighlightProps}
            />
          ))}
        </HighlightRoot>
      ) : null}
    </LocationRoot>
  );
});

export default Location;
