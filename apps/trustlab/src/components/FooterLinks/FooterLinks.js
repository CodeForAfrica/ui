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
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      sx={sx}
      ref={ref}
    >
      {primaryNavigation?.title ? (
        <Typography
          sx={{
            mb: 2.5,
            width: 180,
            position: "relative",
            borderBottom: "2px solid",
            lineHeight: "50px",
            whiteSpace: "nowrap",
            pb: 1,
          }}
          component="div"
          variant="h1"
        >
          {primaryNavigation?.title}
        </Typography>
      ) : null}
      <FooterNavList menus={primaryNavigation?.menus} sx={{ mb: 2 }} />
      {secondaryNavigation?.title ? (
        <Typography
          sx={{
            mb: 2.5,
            width: 180,
            position: "relative",
            borderBottom: "2px solid",
            lineHeight: "50px",
            whiteSpace: "nowrap",
            mt: 0,
            pb: 1,
          }}
          component="div"
          variant="h1"
        >
          {secondaryNavigation?.title}
        </Typography>
      ) : null}
      <FooterNavList menus={secondaryNavigation?.menus} sx={{}} />
    </Box>
  );
});

export default FooterLinks;
