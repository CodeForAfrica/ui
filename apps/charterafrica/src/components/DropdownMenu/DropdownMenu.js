import { Link } from "@commons-ui/next";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import React from "react";

import { neutral } from "@/charterafrica/colors";

const DropdownMenu = React.forwardRef(function DropdownMenu(props, ref) {
  const { MenuItemProps, items, onClick, ...other } = props;

  if (!items?.length) {
    return null;
  }
  return (
    <MenuList
      autoFocusItem
      component="nav"
      disableGutters
      {...other}
      sx={{
        border: 1,
        borderColor: neutral[800],
        background: neutral[50],
        p: 0,
        ...props?.sx,
      }}
      ref={ref}
    >
      {items.map((item) => (
        <MenuItem
          color="inherit"
          component={Link}
          onClick={onClick}
          href={item.href || "#"}
          underline="none"
          variant="caption"
          {...MenuItemProps}
          sx={{
            borderBottom: 1,
            borderColor: neutral[800],
            background: neutral[50],
            color: neutral[900],
            p: 1.25,
            "&.active": {
              background: neutral[100],
            },
            "&:hover": {
              background: neutral[200],
            },
            "&:last-of-type": {
              borderBottom: "none",
            },
            ...MenuItemProps?.sx,
          }}
          key={item.label}
        >
          {item.label}
        </MenuItem>
      ))}
    </MenuList>
  );
});

export default DropdownMenu;
