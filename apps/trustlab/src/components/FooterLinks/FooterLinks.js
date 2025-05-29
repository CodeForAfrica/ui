import { NavListItem } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import { Box } from "@mui/material";
import React from "react";

import FooterNavList from "@/trustlab/components/FooterNavList";

const FooterLinks = React.forwardRef(function FooterLinks(props, ref) {
  const { primaryMenus, secondaryMenus, sx } = props;

  if (!(primaryMenus?.length || secondaryMenus?.length)) {
    return null;
  }
  return (
    <Box sx={sx} ref={ref}>
      <FooterNavList menus={primaryMenus}>
        {secondaryMenus?.map((item, i) => (
          <NavListItem
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-start" },
              mt: i === 0 ? 5 : undefined,
              p: "0  0 10px",
            }}
            key={item.href}
          >
            <Link
              underline="none"
              variant="body2SemiBold"
              sx={{
                color: "text.secondary",
              }}
              href={item.href}
            >
              {item.label}
            </Link>
          </NavListItem>
        )) ?? null}
      </FooterNavList>
    </Box>
  );
});

export default FooterLinks;
