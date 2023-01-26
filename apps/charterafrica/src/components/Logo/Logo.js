import { ImageButton } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import Image from "next/image";
import React from "react";

function Logo(props) {
  const { alt, height, href, priority, src, width } = props;

  if (!src) {
    return null;
  }
  return (
    <ImageButton href={href} component={href ? Link : undefined}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
      />
    </ImageButton>
  );
}

export default Logo;
