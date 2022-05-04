import PropTypes from "prop-types";
import React from "react";

import NavList from "@/codeforafrica/components/NavList";
import NavListItem from "@/codeforafrica/components/NavList/NavListItem";

function FooterMenu({ menu }) {
  if (!menu?.length) {
    return null;
  }

  return (
    <NavList footer>
      {menu.map((item) => (
        <NavListItem
          {..item}
          footer
        />
      ))}
    </NavList>
  );
}

FooterMenu.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    })
  ),
};

FooterMenu.defaultProps = {
  menu: undefined,
};

export default FooterMenu;
