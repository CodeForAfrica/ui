import { Link } from "@commons-ui/next";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";

import FooterNavList from "@/codeforafrica/components/FooterNavList";
import NavListItem from "@/codeforafrica/components/NavListItem";

const ListRoot = styled("div")(({ theme: { breakpoints, typography } }) => ({
  marginTop: typography.pxToRem(85),
  "& li:nth-last-child(2)": {
    marginTop: typography.pxToRem(20),
  },
  [breakpoints.up("md")]: {
    marginTop: 0,
  },
}));

function FooterLinks({ menu, secondaryMenu }) {
  if (!(menu?.length || secondaryMenu?.length)) {
    return null;
  }
  return (
    <ListRoot>
      <FooterNavList menu={menu}>
        {secondaryMenu?.map((item) => (
          <NavListItem
            sx={{
              padding: 0,
              paddingBottom: "0.625rem",
              display: { md: "block", xs: "flex" },
              justifyContent: { md: "flex-start", xs: "center" },
            }}
            key={item.content}
          >
            <Link
              sx={{
                textDecoration: "none",
                color: "text.secondary",
                fontSize: { md: "16px", xs: "16px" },
              }}
              href={item.href}
            >
              {item.content}
            </Link>
          </NavListItem>
        )) ?? null}
      </FooterNavList>
    </ListRoot>
  );
}

FooterLinks.propTypes = {
  additionalLinks: PropTypes.shape({}),
};

FooterLinks.defaultProps = {
  additionalLinks: undefined,
};

export default FooterLinks;
