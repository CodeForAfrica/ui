import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import * as React from "react";

const NavListRoot = styled("ul", {
  shouldForwardProp: (prop) => prop !== "direction",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const { direction } = props.ownerState;
    return [styles.root, direction && styles.direction];
  },
})(({ theme: { breakpoints }, ownerState }) => ({
  ...(!ownerState.direction && {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItem: "flex-start",
    [breakpoints.up("lg")]: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItem: "center",
    },
  }),
}));

const NavList = React.forwardRef(function NavList(props, ref) {
  const { direction = true, children, ...others } = props;
  const ownerState = { ...others, direction };

  return (
    <NavListRoot {...props} ownerState={ownerState} ref={ref}>
      {children}
    </NavListRoot>
  );
});

NavList.propTypes = {
  children: PropTypes.node,
  direction: PropTypes.bool,
};

NavList.defaultProps = {
  children: undefined,
  direction: undefined,
};

export default NavList;
