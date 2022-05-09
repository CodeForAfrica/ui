import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import * as React from "react";

const NavLinkItemRoot = styled("li")(() => ({
  listStyle: "none",
}));

const NavListItem = React.forwardRef(function NavListItem(props, ref) {
  return <NavLinkItemRoot {...props} ref={ref} />;
});

NavListItem.propTypes = {
  children: PropTypes.node,
};

NavListItem.defaultProps = {
  children: undefined,
};

export default NavListItem;
