import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import * as React from "react";

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
