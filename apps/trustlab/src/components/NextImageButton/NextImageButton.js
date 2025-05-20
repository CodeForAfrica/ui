import { ImageButton } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

const NextImageButton = React.forwardRef(function Logo(props, ref) {
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

NextImageButton.propTypes = {
  src: PropTypes.string,
  href: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  priority: PropTypes.bool,
};

NextImageButton.defaultProps = {
  src: undefined,
  href: undefined,
  alt: undefined,
  width: undefined,
  height: undefined,
  priority: undefined,
};

export default NextImageButton;
