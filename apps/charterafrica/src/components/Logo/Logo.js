import { ImageButton } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import Image from "next/image";
import React from "react";

function Logo(props) {
  const { image, href, sx } = props;

  if (!image?.src) {
    return null;
  }
  return (
    <ImageButton
      component={href ? Link : undefined}
      href={href}
      sx={{
        display: "block",
        position: "relative",
        ...sx,
      }}
    >
      <Image {...image} />
    </ImageButton>
  );
}

export default Logo;
