import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import * as React from "react";

const NavLinkItemRoot = styled("li")(() => ({
  listStyle: "none",
  marginBottom: "20px",
}));

const NavListItem = React.forwardRef(function NavListItem(props, ref) {
  const { children } = props;
  return <NavLinkItemRoot ref={ref}>{children}</NavLinkItemRoot>;
});

NavListItem.propTypes = {
  children: PropTypes.node,
};

NavListItem.defaultProps = {
  children: undefined,
};

export default NavListItem;
