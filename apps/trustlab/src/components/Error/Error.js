import { Section } from "@commons-ui/core";
import { Figure, Link } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import { Typography, Box, Button } from "@mui/material";
import React, { forwardRef } from "react";

// eslint-disable-next-line import/no-unresolved
import ErrorPageIcon from "@/trustlab/assets/error-page-icon.svg?url";

const ErrorPage = forwardRef(function ErrorPage(props, ref) {
  const { title, subtitle, image, link, ...other } = props;
  return (
    <Section
      ref={ref}
      {...other}
      sx={{
        py: 8,
        textAlign: "center",
        margin: "0 auto",
        px: { xs: 2.5, md: 0 },
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        sx={{ maxWidth: 600, margin: "0 auto" }}
        gap={2.5}
      >
        <Figure
          ImageProps={{
            alt: "Error page image",
            src: image?.url ?? ErrorPageIcon,
            sx: { objectFit: "contain" },
          }}
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            height: 128,
            width: { xs: 172, md: 380 },
          }}
        />
        <Typography strong variant="display4">
          {title}
        </Typography>
        <LexicalRichText
          elements={subtitle}
          TypographyProps={{
            gutterBottom: true,
            sx: {
              mb: 0,
            },
          }}
        />
        <Button
          component={link?.href ? Link : undefined}
          href={link?.href}
          variant="text"
          sx={{
            textTransform: "none",
            border: "none",
            backgroundColor: "transparent",
            color: "#1020E1",
          }}
        >
          {link?.label}
        </Button>
      </Box>
    </Section>
  );
});

export default ErrorPage;
