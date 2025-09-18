import { Section } from "@commons-ui/core";
import { Figure } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import { Typography, Box } from "@mui/material";
import React, { forwardRef } from "react";

// eslint-disable-next-line import/no-unresolved
import ErrorPageIcon from "@/trustlab/assets/error-page-icon.svg?url";

const ErrorPage = forwardRef(function ErrorPage(props, ref) {
  const { title, subtitle, ...other } = props;

  return (
    <Section ref={ref} {...other} sx={{ py: 8, textAlign: "center" }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gap={2.5}
      >
        <Figure
          ImageProps={{
            alt: "Error page background",
            src: ErrorPageIcon,
            sx: { objectFit: "cover", opacity: 0.3 },
          }}
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            height: 128,
            width: 172,
          }}
        />
        <Typography strong variant="display4">
          {title}
        </Typography>
        <LexicalRichText
          elements={subtitle}
          TypographyProps={{
            gutterBottom: true,
            variant: "banner",
            sx: {
              mb: 0,
            },
          }}
        />
      </Box>
    </Section>
  );
});

export default ErrorPage;
