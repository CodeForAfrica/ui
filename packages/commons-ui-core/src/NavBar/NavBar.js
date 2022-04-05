import AppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import PropTypes from "prop-types";
import * as React from "react";

const NavBarRoot = styled(AppBar, {
  name: "CuiNavBar",
  slot: "Root",
})(({ theme: { palette } }) => ({
  backgroundColor: palette.background.default,
}));

const NavBar = React.forwardRef(function NavBar(
  { children, toolbarProps, ...props },
  ref
) {
  return (
    <NavBarRoot color="inherit" position="sticky" {...props} ref={ref}>
      <Toolbar disableGutters {...toolbarProps}>
        {children}
      </Toolbar>
    </NavBarRoot>
  );
});

NavBar.propTypes = {
  children: PropTypes.node,
  toolbarProps: PropTypes.shape({}),
};

NavBar.defaultProps = {
  children: undefined,
  toolbarProps: undefined,
};

export default NavBar;
