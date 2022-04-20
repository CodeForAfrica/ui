import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useTheme, styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import PropTypes from "prop-types";
import * as React from "react";

const NavContainer = styled(Grid)({
  background: "white",
});

const NavButton = styled(Button)({
  boxShadow: "none",
  textTransform: "capitalize",
  fontSize: "1rem",
  margin: "1rem",
  backgroundColor: "none",
  borderColor: "none",
  "&:hover": {
    backgroundColor: "none",
    borderColor: "none",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "none",
    borderColor: "none",
  },
  "&:focus": {
    boxShadow: "none",
    backgroundColor: "none",
    borderColor: "none",
  },
});

function NavMenu({
  children,
  menu,
  butttonVariant,
  typographyVariant,
  footer,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (!menu?.length) {
    return null;
  }

  return (
    <NavContainer
      container
      direction={isMobile || footer ? "column" : "row"}
      alignItems="flex-start"
      justifyContent={isMobile ? "flex-start" : "flex-end"}
    >
      {menu.map((item) => (
        <Grid item key={item.label}>
          <NavButton variant={butttonVariant} href={item.href}>
            <Typography variant={typographyVariant}>{item.label}</Typography>
          </NavButton>
        </Grid>
      ))}
      {children}
    </NavContainer>
  );
}

NavMenu.propTypes = {
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

NavMenu.defaultProps = {
  footer: undefined,
  butttonVariant: undefined,
  typographyVariant: undefined,
  children: undefined,
};

export default NavMenu;
