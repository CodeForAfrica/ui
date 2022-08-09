import { Link } from "@commons-ui/next";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";

import FooterNavList from "@/codeforafrica/components/FooterNavList";
import NavListItem from "@/codeforafrica/components/NavListItem";

const ListRoot = styled("div")(({ theme: { breakpoints, typography } }) => ({
  marginTop: typography.pxToRem(85),
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
        {secondaryMenu?.map((item, i) => (
          <NavListItem
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-start" },
              mt: i === 0 ? 5 : undefined,
              p: "0  0 10px",
            }}
            key={item.content}
          >
            <Link
              underline="none"
              variant="body2SemiBold"
              sx={{
                color: "text.secondary",
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
