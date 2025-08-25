import { Section } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import { Box } from "@mui/material";
import React, { forwardRef } from "react";

import Button from "@/trustlab/components/StyledButton";

const ActionBanner = forwardRef(
  (
    { backgroundColor, textColor, title, button: buttonProps, buttonLink },
    ref,
  ) => {
    return (
      <Box
        ref={ref}
        sx={{
          backgroundColor,
          color: textColor,
        }}
      >
        <Section sx={{ py: { xs: 2.5, md: 4 }, px: { xs: 2.5, md: 0 } }}>
          <Box
            alignItems={{ md: "center", xs: "flex-start" }}
            justifyContent="space-between"
            display="flex"
            gap={2}
          >
            <LexicalRichText
              elements={title}
              TypographyProps={{
                gutterBottom: true,
                variant: "banner",
                sx: {
                  mb: 0,
                  color: textColor,
                },
              }}
            />
            <Button
              size="large"
              href={buttonLink?.href}
              component={buttonLink?.href ? Link : undefined}
              color={buttonProps.borderColor || "#000"}
            >
              {buttonLink?.label || "Learn More"}
            </Button>
          </Box>
        </Section>
      </Box>
    );
  },
);

export default ActionBanner;
