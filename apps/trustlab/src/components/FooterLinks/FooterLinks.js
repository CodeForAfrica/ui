import { Box, Typography } from "@mui/material";
import React from "react";

import FooterNavList from "@/trustlab/components/FooterNavList";

const FooterLinks = React.forwardRef(function FooterLinks(props, ref) {
  const { primaryMenus, secondaryMenus, sx, title = "Quick Links" } = props;

  if (!(primaryMenus?.length || secondaryMenus?.length)) {
    return null;
  }
  return (
    <Box sx={sx} ref={ref}>
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
            width: 170,
            position: "relative",
            "&::after": {
              content: '""',
              display: "block",
              width: "18px",
              height: "2px",
              backgroundColor: "common.white",
              position: "absolute",
              bottom: 0,
            },
          }}
          component="div"
        >
          {title}
        </Box>
      </Typography>
      <FooterNavList menus={primaryMenus} />
    </Box>
  );
});

export default FooterLinks;
