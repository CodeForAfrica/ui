import { Link } from "@commons-ui/next";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import NavList from "@/codeforafrica/components/NavList";
import NavListItem from "@/codeforafrica/components/NavListItem";

function FooterNavList({ menu }) {
  if (!menu?.length) {
    return null;
  }

  return (
    <Grid
      component="nav"
      item
      xs={12}
      md={3}
      sx={{
        order: { xs: 1, md: 2 },
        display: "flex",
        justifyContent: "center",
      }}
    >
      <NavList direction="column">
        {menu.map((item) => (
          <NavListItem key={item.label}>
            <Link
              href={item.href}
              sx={{
                color: "inherit",
                background: "inherit",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: 23,
                "&:hover, &:active, &:focus, &:focus-within": {
                  textDecoration: "none",
                  color: "inherit",
                },
              }}
            >
              {item.label}
            </Link>
          </NavListItem>
        ))}
      </NavList>
    </Grid>
  );
}

FooterNavList.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    })
  ),
};

FooterNavList.defaultProps = {
  menu: undefined,
};

export default FooterNavList;
