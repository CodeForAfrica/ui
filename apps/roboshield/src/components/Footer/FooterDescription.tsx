import { Figure, Link, RichTypography } from "@commons-ui/next";
import { Stack } from "@mui/material";
import React from "react";

interface FooterDescriptionProps {
  description: any;
  logo: any;
  sx?: any;
}

function FooterDescription({ description, logo, sx }: FooterDescriptionProps) {
  if (!(logo || description)) {
    return null;
  }
  return (
    <Stack alignItems={{ xs: "center", md: "flex-start" }} sx={sx}>
      <Link
        href="/"
        sx={{
          color: "text.secondary",
        }}
      >
        <Figure
          ImageProps={logo}
          sx={{
            display: {
              sm: "block",
            },
            filter: "grayscale(100%)",
            height: { xs: "113px", md: "113px", lg: "113px" },
            width: { xs: "251px", md: "251px", lg: "251px" },
          }}
        />
      </Link>
      <RichTypography
        LinkProps={{
          color: "text.secondary",
          sx: { textDecorationColor: "text.secondary" },
        }}
        sx={{
          color: "text.secondary",
          mt: "52px !important",
        }}
      >
        {description}
      </RichTypography>
    </Stack>
  );
}

export default FooterDescription;
