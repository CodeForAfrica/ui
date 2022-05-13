import { ImageButton } from "@commons-ui/core";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

const ImageIcon = React.forwardRef(function Logo(props) {
  const { alt, src } = props;

  return (
    <ImageButton>
      <Image src={src} alt={alt} />
    </ImageButton>
  );
});

ImageIcon.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};

ImageIcon.defaultProps = {
  src: undefined,
  alt: undefined,
};

export default ImageIcon;
