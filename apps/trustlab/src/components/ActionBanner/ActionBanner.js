import { Section } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import { Box, Button, SvgIcon } from "@mui/material";
import React, { forwardRef } from "react";

import UserIcon from "@/trustlab/assets/icons/Type=user, Size=20, Color=CurrentColor.svg";
import VisitIcon from "@/trustlab/assets/icons/Type=visit, Size=20, Color=CurrentColor.svg";

const ActionBanner = forwardRef(
  (
    { backgroundColor, textColor, title, button: buttonProps, buttonLink },
    ref,
  ) => {
    const ButtonIcon = buttonProps.iconType === "user" ? UserIcon : VisitIcon;
    return (
      <Box
        ref={ref}
        sx={{
          backgroundColor,
          color: textColor,
        }}
      >
        <Section sx={{ py: 4, px: { xs: 2.5, md: 0 } }}>
          <Box
            alignItems="center"
            justifyContent="space-between"
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            gap={2}
          >
            <LexicalRichText
              elements={title}
              TypographyProps={{
                gutterBottom: true,
                sx: {
                  mb: 0,
                  color: textColor,
                },
              }}
            />
            <Button
              sx={{
                backgroundColor:
                  buttonProps.variant === "contained"
                    ? undefined
                    : "transparent",
                borderRadius: 1,
                borderColor: buttonProps.borderColor,
                textTransform: "none",
              }}
              variant={buttonProps.variant}
              size="large"
              href={buttonLink?.href}
              component={buttonLink?.href ? Link : undefined}
            >
              <SvgIcon
                sx={{ height: 20, width: 20, fill: "transparent" }}
                component={ButtonIcon}
              />
              {buttonLink?.label || "Learn More"}
            </Button>
          </Box>
        </Section>
      </Box>
    );
  },
);

export default ActionBanner;
