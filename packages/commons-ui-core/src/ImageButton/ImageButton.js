import ButtonBase from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";

const ImageButtonRoot = styled(ButtonBase, {
  slot: "Root",
})(({ ownerState }) => ({
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
  },
  ...(ownerState.src && {
    height: ownerState.height,
    position: "relative",
    width: ownerState.width,
  }),
}));

const ImageRoot = styled("span", {
  slot: "Root",
})(({ ownerState }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundImage: `url("${ownerState.src}")`,
  backgroundSize: "contain",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
}));

const ImageButton = React.forwardRef(function ImageButton(props, ref) {
  const { children, height, src, width, ...other } = props;
  let image = children;
  if (src) {
    image = <ImageRoot ownerState={{ src }} />;
  }

  return (
    <ImageButtonRoot {...other} ownerState={{ height, src, width }} ref={ref}>
      {image}
    </ImageButtonRoot>
  );
});

ImageButton.propTypes = {
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The image URL.
   */
  src: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

ImageButton.defaultProps = {
  height: undefined,
  src: undefined,
  width: undefined,
};

export default ImageButton;
