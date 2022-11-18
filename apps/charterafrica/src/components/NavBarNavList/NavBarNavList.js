import { NavList } from "@commons-ui/core";
import React from "react";

import NavBarDropdown from "@/charterafrica/components/NavBarDropdown";

const NavBarNavList = React.forwardRef(function NavBarNavList(props, ref) {
  const { direction, menus, ...other } = props;

  if (!menus?.length) {
    return null;
  }
  return (
    <NavList direction={direction} {...other} ref={ref}>
      {menus.map((item) => (
        <NavBarDropdown key={item.title} menu={item} />
      ))}
    </NavList>
  );
});

export default NavBarNavList;
