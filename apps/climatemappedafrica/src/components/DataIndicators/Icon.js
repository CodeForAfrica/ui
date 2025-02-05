import { Box, ButtonBase, Typography } from "@mui/material";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

function Icon({ item, handleIconClick, currentItemIndex, index }) {
  const { title, primaryIcon, secondaryIcon } = item;

  return (
    <ButtonBase
      onClick={handleIconClick}
      sx={{
        display: "flex",
        flexDirection: {
          xs: "row",
          lg: "column",
        },
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={({ typography }) => ({
          position: "relative",
          height: { xs: typography.pxToRem(88.8), lg: typography.pxToRem(140) },
          width: { xs: typography.pxToRem(88.8), lg: typography.pxToRem(140) },
        })}
      >
        <Image
          src={index === currentItemIndex ? secondaryIcon : primaryIcon}
          fill
        />
      </Box>
      <Typography
        sx={({ typography }) => ({
          display: "flex",
          fontSize: typography.pxToRem(20),
          width: { xs: typography.pxToRem(200), lg: "auto" },
        })}
      >
        {title}
      </Typography>
    </ButtonBase>
  );
}

Icon.propTypes = {
  handleIconClick: PropTypes.func,
  currentItemIndex: PropTypes.number,
  index: PropTypes.number,
  item: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    hover: PropTypes.string,
  }),
};

export default Icon;
