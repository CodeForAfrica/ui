import { styled, SxProps } from "@mui/material/styles";
import React, { FC, ForwardedRef, HTMLAttributes } from "react";

const NavListItemRoot = styled("li")({
  listStyle: "none",
});

interface Props extends HTMLAttributes<HTMLLIElement> {
  sx?: SxProps;
}

const NavListItem: FC<Props> = React.forwardRef(function NavListItem(
  props,
  ref: ForwardedRef<any>,
) {
  return <NavListItemRoot {...props} ref={ref} />;
});

export default NavListItem;
