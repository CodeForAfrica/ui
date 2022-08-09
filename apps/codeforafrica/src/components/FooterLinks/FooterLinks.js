import { Link } from "@commons-ui/next";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import React from "react";

import FooterNavList from "@/codeforafrica/components/FooterNavList";
import NavListItem from "@/codeforafrica/components/NavListItem";

const FooterLinks = React.forwardRef(function FooterLinks(props, ref) {
  const { menu, secondaryMenu, sx } = props;

  if (!(menu?.length || secondaryMenu?.length)) {
    return null;
  }
  return (
    <Box sx={sx} ref={ref}>
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
    </Box>
  );
});

FooterLinks.propTypes = {
  additionalLinks: PropTypes.shape({}),
};

FooterLinks.defaultProps = {
  additionalLinks: undefined,
};

export default FooterLinks;
