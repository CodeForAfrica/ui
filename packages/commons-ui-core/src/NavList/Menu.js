import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import PropTypes from "prop-types";
import * as React from "react";

function Menu({ children, menu, butttonVariant, typographyVariant, footer }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!menu?.length) {
    return null;
  }

  return (
    <Grid
      container
      direction={isMobile || footer ? "column" : "row"}
      alignItems="center"
      justifyContent={isMobile ? "flex-start" : "flex-end"}
    >
      {menu.map((item) => (
        <Grid item key={item.label}>
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
  footer: PropTypes.bool,
};

Menu.defaultProps = {
  footer: undefined,
  butttonVariant: undefined,
  typographyVariant: undefined,
  children: undefined,
};

export default Menu;
