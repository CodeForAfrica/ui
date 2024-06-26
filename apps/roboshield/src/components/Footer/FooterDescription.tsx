import { Figure, Link } from "@commons-ui/next";
import { Stack, Theme } from "@mui/material";
import React from "react";
import RichText from "@/roboshield/components/RichText";

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
      <RichText
        variant="footer"
        typographyProps={{
          LinkProps: {
            color: "text.secondary",
            sx: { textDecorationColor: "text.secondary" },
          },
        }}
        sx={(theme: Theme) => ({
          a: {
            color: theme.palette.text.secondary,
            textDecorationColor: theme.palette.text.secondary,
          },
          mt: "52px",
          typography: "footer",
        })}
        elements={description}
      />
    </Stack>
  );
}

export default FooterDescription;
