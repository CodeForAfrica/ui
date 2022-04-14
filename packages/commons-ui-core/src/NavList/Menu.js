import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import * as React from "react";

function Menu({ children, menu, footer }) {
  if (!menu?.length) {
    return null;
  }

  return (
    <Grid
      item
      xs={8}
      container
      direction={!footer ? "row" : "column"}
      alignItems="center"
      justifyContent="space-around"
    >
      {menu.map((item) => (
        <Grid item key={item.label}>
          <Button variant="text" href={item.href}>
            <Typography variant="subheading">{item.label}</Typography>
          </Button>
        </Grid>
      ))}
      {children}
    </Grid>
  );
}

Menu.propTypes = {
  footer: PropTypes.bool,
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    }).isRequired
  ).isRequired,
  children: PropTypes.node,
};

Menu.defaultProps = {
  footer: undefined,
  children: undefined,
};

export default Menu;
