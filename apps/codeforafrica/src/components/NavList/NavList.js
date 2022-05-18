import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";

const NavListRoot = styled("ul", {
  overridesResolver: (props, styles) => {
    const { direction } = props.ownerState;
    return [styles.root, direction && styles[direction]];
  },
})(({ ownerState }) => ({
  display: "flex",
  flexDirection: ownerState.direction,
  padding: 0,
  margin: 0,
  ...(ownerState.direction === "row" && {
    justifyContent: "flex-end",
    alignItems: "center",
  }),
}));

const NavList = React.forwardRef(function NavList(props, ref) {
  const { direction = "column", ...other } = props;
  const ownerState = { direction };

  return <NavListRoot {...other} ownerState={ownerState} ref={ref} />;
});

NavList.propTypes = {
  direction: PropTypes.oneOf(["column", "row"]),
};

NavList.defaultProps = {
  direction: undefined,
};

export default NavList;
