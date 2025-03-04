import { Box } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import Image from "@/hurumap/next/Image";

function Media({
  alt,
  chart,
  embed,
  image,
  imageProps,
  media: mediaProp,
  ...props
}) {
  const { variant, square } = props;
  const media = (variant === "embed" ? chart || embed : image) || mediaProp;

  if (!media) {
    return null;
  }
  return (
    <Box
      sx={({ typography }) => ({
        minWidth: {
          xs: typography.pxToRem(square ? 278 : 350),
          md: typography.pxToRem(square ? 278 : 296),
          lg: typography.pxToRem(square ? 278 : 376),
        },
        position: "relative",
        width: {
          xs: "100%",
          md: "auto",
        },
        height: {
          md: typography.pxToRem(square ? 278 : 183),
          lg: typography.pxToRem(square ? 278 : 233),
        },
        "&:after": {
          content: '""',
          display: {
            xs: "block",
            md: "none",
          },
          paddingTop: square ? "100%" : "61.714%",
        },
        ".image": {
          objectFit: "contain !important",
        },
        ...(variant === "embed" && {
          "& > :first-child": {
            position: "absolute",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
          },
        }),
      })}
    >
      <Image
        layout="fill"
        alt={alt}
        src={media}
        unoptimized
        className="image"
      />
    </Box>
  );
}

Media.propTypes = {
  alt: PropTypes.string,
  chart: PropTypes.node,
  embed: PropTypes.node,
  image: PropTypes.node,
  imageProps: PropTypes.shape({}),
  media: PropTypes.node,
  variant: PropTypes.string,
};

export default Media;
