import ButtonBase from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";

const ImageButtonRoot = styled(ButtonBase, {
  shouldForwardProp: (prop) => !["height", "src", "width"].includes(prop),
  slot: "Root",
  overridesResolver: (props, styles) => {
    const { src } = props.ownerState;

    return [styles.root, src && styles.src];
  },
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
  shouldForwardProp: (prop) => prop !== "src",
  slot: "Root",
})(({ src }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundImage: `url("${src}")`,
  backgroundSize: "contain",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
}));

const ImageButton = React.forwardRef(function ImageButton(props, ref) {
  const { children, src, ...other } = props;
  let image = children;
  if (src) {
    image = <ImageRoot src={src} />;
  }
  const ownerState = { ...props };
  return (
    <ImageButtonRoot ownerState={ownerState} ref={ref} {...props}>
      {image}
    </ImageButtonRoot>
  );
});

ImageButton.propTypes = {
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The image URL.
   */
  src: PropTypes.node,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

ImageButton.defaultProps = {
  height: undefined,
  onClick: undefined,
  src: undefined,
  width: undefined,
};

export default ImageButton;
