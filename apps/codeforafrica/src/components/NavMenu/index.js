import { Link } from "@commons-ui/next";
import PropTypes from "prop-types";
import React from "react";

import NavList from "@/codeforafrica/components/NavList";
import NavListItem from "@/codeforafrica/components/NavListItem";

function FooterMenu({ menu }) {
  if (!menu?.length) {
    return null;
  }

  return (
    <NavList direction="row">
      {menu.map((item) => (
        <NavListItem key={item.label}>
          <Link
            href={item.href}
            sx={{
              color: "inherit",
              background: "inherit",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: 18,
              "&:hover, &:active, &:focus, &:focus-within": {
                textDecoration: "underline",
                color: "#1020E1",
              },
            }}
          >
            {item.label}
          </Link>
        </NavListItem>
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
