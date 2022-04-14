import { Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

function NavList({ children, menu }) {
  if (!menu?.length) {
    return null;
  }

  return (
    <Grid container>
      {menu.map((item) => (
        <Grid item key={item.label}>
          <Typography variant="body1">{item.label}</Typography>
        </Grid>
      ))}
      {children}
    </Grid>
  );
}

NavList.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    }).isRequired
  ).isRequired,
  children: PropTypes.node,
};

NavList.defaultProps = {
  children: undefined,
};

export default NavList;
