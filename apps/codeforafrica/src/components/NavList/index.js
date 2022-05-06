import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import * as React from "react";

const NavListRoot = styled("ul", {
  shouldForwardProp: (prop) => prop !== "direction",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const { direction } = props.ownerState;
    return [styles.root, styles[direction]];
  },
})(({ ownerState }) => ({
  display: "flex",
  ...(ownerState.direction === "column" && {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItem: "flex-start",
  }),
  ...(ownerState.direction === "row" && {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItem: "center",
  }),
}));

const NavList = React.forwardRef(function NavList(props, ref) {
  const { direction = "column", children, ...others } = props;
  const ownerState = { ...others, direction };

  return (
    <NavListRoot {...props} ownerState={ownerState} ref={ref}>
      {children}
    </NavListRoot>
  );
});

NavList.propTypes = {
  direction: PropTypes.oneOf(["column", "row"]),
};

NavList.defaultProps = {
  children: undefined,
  direction: undefined,
};

export default NavList;
