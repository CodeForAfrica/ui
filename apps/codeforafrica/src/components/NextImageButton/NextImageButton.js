import { ImageButton } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

const NextImageButton = React.forwardRef(function Logo(props, ref) {
  const { alt, src, width, href, height, ...other } = props;

  return (
    <ImageButton
      href={href}
      component={href ? Link : undefined}
      {...other}
      ref={ref}
    >
      <Image src={src} alt={alt} width={width} height={height} />
    </ImageButton>
  );
});

NextImageButton.propTypes = {
  src: PropTypes.string,
  href: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

NextImageButton.defaultProps = {
  src: undefined,
  href: undefined,
  alt: undefined,
  width: undefined,
  height: undefined,
};

export default NextImageButton;
