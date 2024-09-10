import { styled } from "@mui/material/styles";
import type { SxProps, Theme } from "@mui/material/styles";
import React from "react";

const NavListItemRoot = styled("li")({
  listStyle: "none",
});

interface NavListItemProps {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
}

const NavListItem = React.forwardRef(function NavListItem(
  props: NavListItemProps,
  ref: React.ForwardedRef<HTMLLIElement>,
) {
  return <NavListItemRoot {...props} ref={ref} />;
});

export default NavListItem;
