import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import * as React from "react";

const NavUl = styled("ul")(({ theme: { breakpoints } }) => ({
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
}));

function NavList({ children }) {
  return <NavUl>{children}</NavUl>;
}

NavList.propTypes = {
  children: PropTypes.node,
};

NavList.defaultProps = {
  children: undefined,
};

export default NavList;
