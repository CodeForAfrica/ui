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
  justifyContent: "flex-start",
  alignItem: "flex-start",
  ...(ownerState.direction === "column" && {
    flexDirection: "column",
  }),
  ...(ownerState.direction === "row" && {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItem: "center",
  }),
}));

const NavList = React.forwardRef(function NavList(props, ref) {
  const { direction = "column" } = props;
  const ownerState = { direction };

  return <NavListRoot {...props} ownerState={ownerState} ref={ref} />;
});

NavList.propTypes = {
  direction: PropTypes.oneOf(["column", "row"]),
};

NavList.defaultProps = {
  direction: undefined,
};

export default NavList;
