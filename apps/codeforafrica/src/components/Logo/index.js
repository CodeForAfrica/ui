import { IconButton } from "@mui/material";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

const Logo = React.forwardRef(function Logo(props) {
  const { alt, src } = props;

  return (
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
      sx={{ mr: 2 }}
    >
      <Image src={src} alt={alt} />
    </IconButton>
  );
});

Logo.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};

Logo.defaultProps = {
  src: undefined,
  alt: undefined,
};

export default Logo;
