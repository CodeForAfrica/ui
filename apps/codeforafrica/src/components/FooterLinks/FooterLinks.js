import { Link } from "@commons-ui/next";
import { Typography, List, ListItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";

import FooterNavList from "@/codeforafrica/components/FooterNavList";

const ListItemRoot = styled(ListItem)(
  ({ theme: { breakpoints, typography } }) => ({
    padding: 0,
    paddingBottom: typography.pxToRem(10),
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
  "& li:nth-last-child(2)": {
    marginTop: typography.pxToRem(20),
  },
  [breakpoints.up("md")]: {
    marginTop: 0,
  },
}));

const LinkRoot = styled(Link)(({ theme: { palette } }) => ({
  textDecoration: "none",
  color: palette.text.secondary,
}));
function FooterLinks({ footerLinks, menu }) {
  if (!footerLinks) {
    return null;
  }
  return (
    <ListRoot>
      <FooterNavList menu={menu}>
        {footerLinks.secondary.map((item) => (
          <ListItemRoot key={item.name}>
            <LinkRoot href={item.href}>
              <Typography variant="p2">{item.name}</Typography>
            </LinkRoot>
          </ListItemRoot>
        ))}
      </FooterNavList>
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
