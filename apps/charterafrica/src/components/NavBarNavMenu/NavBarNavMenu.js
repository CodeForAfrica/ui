import { NavList } from "@commons-ui/core";
import React from "react";

import NavBarDropdown from "@/charterafrica/components/NavBarDropdown";

const NavBarNavMenu = React.forwardRef(function NavBarNavMenu(props, ref) {
  const { direction, menus, ...other } = props;

  if (!menus?.length) {
    return null;
  }
  return (
    <NavList direction={direction} {...other} ref={ref}>
      {menus.map((menu) => (
        <NavBarDropdown key={menu.label} menu={menu} />
      ))}
    </NavList>
  );
});

export default NavBarNavMenu;
