import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import * as React from "react";

function Menu({
  children,
  menu,
  butttonVariant,
  isMobile,
  typographyVariant,
  footer,
}) {
  if (!menu?.length) {
    return null;
  }

  return (
    <Grid
      container
      direction={isMobile || footer ? "column" : "row"}
      alignItems="center"
      justifyContent="space-between"
    >
      {menu.map((item) => (
        <Grid item xs={2} key={item.label}>
          <Button variant={butttonVariant} href={item.href}>
            <Typography variant={typographyVariant}>{item.label}</Typography>
          </Button>
        </Grid>
      ))}
      {children}
    </Grid>
  );
}

Menu.propTypes = {
  butttonVariant: PropTypes.string,
  typographyVariant: PropTypes.string,
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    }).isRequired
  ).isRequired,
  children: PropTypes.node,
  isMobile: PropTypes.bool,
  footer: PropTypes.bool,
};

Menu.defaultProps = {
  footer: undefined,
  butttonVariant: undefined,
  typographyVariant: undefined,
  children: undefined,
  isMobile: undefined,
};

export default Menu;
