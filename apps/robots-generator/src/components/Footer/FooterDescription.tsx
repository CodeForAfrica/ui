import { Figure, Link } from "@commons-ui/next";
import { Stack, Typography } from "@mui/material";
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
      <Link href="/">
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
      <Typography
        sx={{
          color: "text.secondary",
          textAlign: { xs: "center", md: "left" },
          typography: "footer",
          mt: "52px !important",
        }}
      >
        {description}
      </Typography>
    </Stack>
  );
}

export default FooterDescription;
