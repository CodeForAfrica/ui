import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

function SubcategoryHeader({ title, description, ...props }) {
  if (!title) {
    return null;
  }
  return (
    <Box
      sx={({ palette }) => ({
        borderBottom: `solid 1px ${palette.divider}`,
        borderTop: `solid 1px ${palette.divider}`,
      })}
    >
      <Typography
        {...props}
        variant="h5"
        sx={({ typography }) => ({
          color: "#1c2030",
          fontWeight: 400,
          letterSpacing: typography.pxToRem(2),
          paddingBottom: typography.pxToRem(20),
          paddingTop: typography.pxToRem(20),
          // In mobile, we need to account for navbar + category tabs
          scrollMarginTop: {
            xs: typography.pxToRem(160),
            lg: typography.pxToRem(110),
          },
          textTransform: "uppercase",
        })}
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        sx={({ typography }) => ({
          paddingBottom: typography.pxToRem(20),
          "& p": {
            margin: 0,
          },
        })}
      >
        {description}
      </Typography>
    </Box>
  );
}

SubcategoryHeader.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default SubcategoryHeader;
