import { Box, ButtonBase, Typography } from "@mui/material";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

function Icon({ item, handleIconClick, currentItemIndex, index }) {
  const { title, primaryIcon, secondaryIcon } = item;

  return (
    <ButtonBase
      onClick={handleIconClick}
      sx={({ breakpoints }) => ({
        display: "flex",
        ...(breakpoints.up("lg") && {
          display: "block",
        }),
      })}
    >
      <Box
        sx={({ typography, breakpoints }) => ({
          position: "relative",
          height: typography.pxToRem(88.8),
          width: typography.pxToRem(88.8),
          ...(breakpoints.up("lg") && {
            height: typography.pxToRem(140),
            width: typography.pxToRem(140),
          }),
        })}
      >
        <Image
          src={index === currentItemIndex ? secondaryIcon : primaryIcon}
          layout="fill"
        />
      </Box>
      <Typography
        sx={({ typography, breakpoints }) => ({
          display: "flex",
          marginLeft: typography.pxToRem(31),
          fontSize: typography.pxToRem(20),
          width: typography.pxToRem(200),
          ...(breakpoints.up("lg") && {
            width: "auto",
            display: "block",
            margin: `${typography.pxToRem(20)} auto 0`,
          }),
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
