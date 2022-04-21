import { Grid } from "@mui/material";
import Link from "@mui/material/Link";
import { useTheme, styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import PropTypes from "prop-types";
import * as React from "react";

const NavLink = styled(Link)({
  boxShadow: "none",
  textTransform: "capitalize",
  fontSize: 16,
  color: "black",
  textDecoration: "none",
  margin: 16,
  backgroundColor: "transparent",
  borderColor: "none",
  "&:hover, &:active, &:focus, &:focus-within": {
    backgroundColor: "transparent",
    borderColor: "none",
    boxShadow: "none",
  },
  "&:hover": {
    textDecoration: "underline",
    color: "blue",
  },
});

const NavContainer = styled(Grid)({
  background: "white",
});

function NavMenu({ children, menu, typographyVariant }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (!menu?.length) {
    return null;
  }

  return (
    <NavContainer
      container
      direction={isMobile ? "column" : "row"}
      alignItems="flex-start"
      justifyContent={isMobile ? "flex-start" : "flex-end"}
    >
      {menu.map((item) => (
        <Grid item key={item.label}>
          <NavLink href={item.href} variant={typographyVariant}>
            {item.label}
          </NavLink>
        </Grid>
      ))}
      {children}
    </NavContainer>
  );
}

NavMenu.propTypes = {
  typographyVariant: PropTypes.string,
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    }).isRequired
  ).isRequired,
  children: PropTypes.node,
};

NavMenu.defaultProps = {
  typographyVariant: undefined,
  children: undefined,
};

export default NavMenu;
