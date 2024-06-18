import { ImageButton } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import Image from "next/image";
import React, { FC } from "react";

interface Props {
  src?: string;
  href?: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  onClick?: () => void;
}

const NextImageButton: FC<Props> = React.forwardRef(function Logo(props, ref) {
  const { alt, height, href, priority, src, width, ...other } = props;

  if (!src) {
    return null;
  }
  return (
    <ImageButton
      href={href}
      component={href ? Link : undefined}
      {...other}
      ref={ref}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
      />
    </ImageButton>
  );
});

export default NextImageButton;
