import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import * as React from "react";

const NavUl = styled("ul", {
  shouldForwardProp: (prop) => prop !== "footer",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const { footer } = props.ownerState;
    return [styles.root, footer && styles.footer];
  },
})(({ theme: { breakpoints }, ownerState }) => ({
  ...(!ownerState?.footer && {
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
  const { footer = true, children, ...others } = props;
  const ownerState = { ...others, footer };

  return (
    <NavUl {...props} footer={footer} ownerState={ownerState} ref={ref}>
      {children}
    </NavUl>
  );
});

NavList.propTypes = {
  children: PropTypes.node,
  footer: PropTypes.bool,
};

NavList.defaultProps = {
  children: undefined,
  footer: undefined,
};

export default NavList;
