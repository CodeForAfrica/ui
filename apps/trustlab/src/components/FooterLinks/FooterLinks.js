import { Box, Typography } from "@mui/material";
import React from "react";

import FooterNavList from "@/trustlab/components/FooterNavList";

const FooterLinks = React.forwardRef(function FooterLinks(props, ref) {
  const { primaryNavigation, secondaryNavigation, sx } = props;

  if (
    !(primaryNavigation?.menus?.length || secondaryNavigation?.menus?.length)
  ) {
    return null;
  }
  return (
    <Box sx={sx} ref={ref}>
      {primaryNavigation?.title ? (
        <Typography
          sx={{
            mb: 2.5,
            pb: 1,
            div: {
              paddingBottom: "8px",
            },
            justifyContent: { xs: "center", md: "left" },
            display: "flex",
          }}
          component="div"
          variant="h1"
        >
          <Box
            sx={{
              width: 180,
              position: "relative",
              borderBottom: "2px solid",
              lineHeight: "50px",
              whiteSpace: "nowrap",
              my: 0,
            }}
            component="div"
          >
            {primaryNavigation?.title}
          </Box>
        </Typography>
      ) : null}
      <FooterNavList menus={primaryNavigation?.menus} sx={{ mb: 2 }} />
      {secondaryNavigation?.title ? (
        <Typography
          sx={{
            mb: 2.5,
            pb: 1,
            div: {
              paddingBottom: "8px",
            },
            justifyContent: { xs: "center", md: "left" },
            display: "flex",
          }}
          component="div"
          variant="h1"
        >
          <Box
            sx={{
              width: 180,
              position: "relative",
              borderBottom: "2px solid",
              lineHeight: "50px",
              whiteSpace: "nowrap",
              my: 0,
            }}
            component="div"
          >
            {secondaryNavigation?.title}
          </Box>
        </Typography>
      ) : null}
      <FooterNavList menus={secondaryNavigation?.menus} sx={{}} />
    </Box>
  );
});

export default FooterLinks;
