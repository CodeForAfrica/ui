import { Link } from "@commons-ui/next";
import { Typography, List, ListItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";

const ListItemLinks = styled(ListItem)(
  ({ theme: { typography, breakpoints } }) => ({
    padding: 0,
    paddingBottom: typography.pxToRem(20),
    display: "flex",
    justifyContent: "center",
    [breakpoints.up("md")]: {
      display: "block",
      justifyContent: "flex-start",
    },
  })
);

const ListRoot = styled(List)(({ theme: { breakpoints, typography } }) => ({
  marginTop: typography.pxToRem(85),
  [breakpoints.up("lg")]: {
    marginTop: 0,
  },
}));

const LinkRoot = styled(Link)(({ theme: { palette } }) => ({
  textDecoration: "none",
  color: palette.text.secondary,
}));

function FooterLinks({ footerLinks }) {
  if (!footerLinks) {
    return null;
  }
  return (
    <ListRoot>
      {footerLinks.main.map((item) => (
        <ListItemLinks>
          <LinkRoot href={item.href}>
            <Typography variant="h5">{item.name}</Typography>
          </LinkRoot>
        </ListItemLinks>
      ))}
    </ListRoot>
  );
}

FooterLinks.propTypes = {
  footerLinks: PropTypes.shape({}),
};

FooterLinks.defaultProps = {
  footerLinks: undefined,
};

export default FooterLinks;
