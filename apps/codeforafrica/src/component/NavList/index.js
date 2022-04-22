import { Grid } from "@mui/material";
import Link from "@mui/material/Link";
import { useTheme, styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import PropTypes from "prop-types";
import * as React from "react";

const NavLink = styled(Link)(({ theme }) => ({
  boxShadow: "none",
  textTransform: "capitalize",
  color: theme.palette.text.secondary.main,
  textDecoration: "none",
  fontSize: "18px",
  margin: "24px",
  backgroundColor: "transparent",
  "&:hover, &:active, &:focus, &:focus-within": {
    color: theme.palette.text.secondary.main,
  },
  [theme.breakpoints.up("lg")]: {
    boxShadow: "none",
    textTransform: "capitalize",
    color: theme.palette.text.primary.main,
    textDecoration: "none",
    fontSize: "18px",
    margin: "24px",
    backgroundColor: "transparent",
    borderColor: "none",
    "&:hover, &:active, &:focus, &:focus-within": {
      textDecoration: "underline",
      color: theme.palette.primary.main,
    },
  },
}));
function NavMenu({ children, menu }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (!menu?.length) {
    return null;
  }

  return (
    <Grid
      container
      direction={isMobile ? "column" : "row"}
      alignItems="flex-start"
      justifyContent={isMobile ? "flex-start" : "flex-end"}
    >
      {menu.map((item) => (
        <Grid item key={item.label}>
          <NavLink href={item.href} variant="body1">
            {item.label}
          </NavLink>
        </Grid>
      ))}
      {children}
    </Grid>
  );
}

NavMenu.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    }).isRequired
  ).isRequired,
  children: PropTypes.node,
};

NavMenu.defaultProps = {
  children: undefined,
};

export default NavMenu;
