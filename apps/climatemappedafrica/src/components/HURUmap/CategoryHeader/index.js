import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import Image from "@/climatemappedafrica/components/Image";

function CategoryHeader({ title, description, icon, ...props }) {
  if (!title) {
    return null;
  }
  return (
    <div>
      <Typography
        {...props}
        variant="h3"
        sx={({ typography }) => ({
          fontSize: typography.pxToRem(28),
          display: "flex",
          alignItems: "center",
          scrollMarginTop: typography.pxToRem(110),
          paddingTop: typography.pxToRem(40),
          paddingBottom: typography.pxToRem(20),
        })}
      >
        {icon && (
          <Box
            sx={({ typography }) => ({
              position: "relative",
              height: typography.pxToRem(32),
              width: typography.pxToRem(32),
              marginRight: typography.pxToRem(10),
            })}
          >
            <Image src={icon} layout="fill" />
          </Box>
        )}
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
    </div>
  );
}

CategoryHeader.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.string,
};

export default CategoryHeader;
