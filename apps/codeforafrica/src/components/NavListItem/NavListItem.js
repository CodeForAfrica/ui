import { styled } from "@mui/material/styles";
import React from "react";

const NavListItemRoot = styled("li")({
  listStyle: "none",
});

const NavListItem = React.forwardRef(function NavListItem(props, ref) {
  return <NavListItemRoot {...props} ref={ref} />;
});

export default NavListItem;
