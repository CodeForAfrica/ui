import { Section } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import { Box } from "@mui/material";
import React, { forwardRef } from "react";

import Button from "@/trustlab/components/StyledButton";

const ContentActionBanner = forwardRef(function ContentActionBanner(
  { backgroundColor, textColor, content, button: buttonProps, buttonLink },
  ref,
) {
  return (
    <Box
      ref={ref}
      sx={{
        backgroundColor,
        color: textColor,
      }}
      data-testid="content-action-banner"
    >
      <Section sx={{ py: { xs: 2.5, md: 3 }, px: { xs: 2.5, md: 0 } }}>
        <Box
          alignItems={{ md: "center", xs: "flex-start" }}
          justifyContent="space-between"
          flexDirection={{ md: "row", xs: "column" }}
          display="flex"
          gap={2}
        >
          <LexicalRichText
            elements={content}
            sx={{
              h1: {
                mb: 2,
                fontSize: "24px",
                fontWeight: 700,
                color: textColor,
              },
              p: {
                mb: 3,
              },
              color: textColor,
            }}
            TypographyProps={{
              variant: "p2",
              gutterBottom: true,
              sx: {
                mb: 3,
                color: textColor,
              },
            }}
          />
          {buttonLink?.href && (
            <Button
              size="large"
              href={buttonLink.href}
              component={Link}
              color={buttonProps?.borderColor || "#000"}
              bgcolor={backgroundColor || "transparent"}
              sx={{ mr: { xs: 0, md: 10 } }}
              buttonProps={{
                sx: {
                  height: 76,
                  fontSize: 24,
                  width: { xs: "100%", md: "max-content" },
                  fontWeight: 900,
                },
              }}
            >
              {buttonLink.label || "Learn More"}
            </Button>
          )}
        </Box>
      </Section>
    </Box>
  );
});

export default ContentActionBanner;
