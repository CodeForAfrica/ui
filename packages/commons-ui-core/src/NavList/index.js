import PropTypes from "prop-types";
import * as React from "react";

import NavIcon from "@/commons-ui/core/NavList/NavIcon";
import NavMenu from "@/commons-ui/core/NavList/NavMenu";

function NavList({ menu, links }) {
  if (!menu?.length) {
    return null;
  }
  if (!links?.length) {
    return null;
  }
  return (
    <NavMenu menu={menu}>
      <NavIcon links={links} />
    </NavMenu>
  );
}

NavList.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
    }).isRequired
  ).isRequired,
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    }).isRequired
  ).isRequired,
};

export default NavList;
