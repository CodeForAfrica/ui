import { Link } from "@commons-ui/next";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import React from "react";

import { neutral } from "@/charterafrica/colors";

const DropdownMenu = React.forwardRef(function DropdownMenu(props, ref) {
  const { MenuItemProps, items, onClick, selectedIndex, ...other } = props;

  if (!items?.length) {
    return null;
  }
  return (
    <MenuList
      autoFocusItem
      component="nav"
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
      {items.map((item, i) => (
        <MenuItem
          color="inherit"
          component={Link}
          onClick={onClick}
          href={item.href || "#"}
          underline="none"
          variant="caption"
          selected={selectedIndex === i}
          {...MenuItemProps}
          sx={{
            borderBottom: 1,
            borderColor: neutral[800],
            background: neutral[50],
            color: neutral[900],
            p: 1.25,
            "&.Mui-selected": {
              background: neutral[100],
            },
            "&:hover": {
              backgroundColor: neutral[200],
            },
            "&.Mui-selected:hover": {
              backgroundColor: neutral[200],
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
