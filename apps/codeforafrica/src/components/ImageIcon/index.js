import { ImageButton } from "@commons-ui/core";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

const ImageIcon = React.forwardRef(function Logo(props) {
  const { alt, src, onClick, width, height } = props;

  return (
    <ImageButton onClick={onClick}>
      <Image src={src} alt={alt} width={width} height={height} />
    </ImageButton>
  );
});

ImageIcon.propTypes = {
  src: PropTypes.string,
  onClick: PropTypes.func,
  alt: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

ImageIcon.defaultProps = {
  src: undefined,
  onClick: undefined,
  alt: undefined,
  width: undefined,
  height: undefined,
};

export default ImageIcon;
