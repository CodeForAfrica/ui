import { Section } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import React, { forwardRef, useState } from "react";

import CloseIcon from "@/trustlab/assets/icons/close.svg";
import Button from "@/trustlab/components/StyledButton";

const ActionBanner = forwardRef(function ActionBanner(
  {
    backgroundColor,
    textColor,
    title,
    button: buttonProps,
    buttonLink,
    embedCode,
    embedDialogTitle,
    embedCloseLabel,
  },
  ref,
) {
  const hasEmbed = Boolean(embedCode);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    if (hasEmbed) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getButtonComponent = () => {
    if (hasEmbed) {
      return "button";
    }
    if (buttonLink?.href) {
      return Link;
    }
    return "button";
  };

  const buttonComponent = getButtonComponent();
  const buttonHref = hasEmbed ? undefined : buttonLink?.href;

  return (
    <Box
      ref={ref}
      sx={{
        backgroundColor,
        color: textColor,
      }}
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
            elements={title}
            TypographyProps={{
              gutterBottom: true,
              variant: "banner",
              sx: {
                mb: 0,
                fontSize: { xs: 34, md: 44 },
                color: textColor,
                strong: {
                  fontWeight: 800,
                },
              },
            }}
          />
          <Button
            size="large"
            href={buttonHref}
            component={buttonComponent}
            onClick={hasEmbed ? handleOpen : undefined}
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
            {buttonLink?.label || "Learn More"}
          </Button>
        </Box>
      </Section>

      {hasEmbed && (
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 2,
            },
          }}
        >
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pr: 1,
            }}
          >
            {embedDialogTitle || ""}
            <IconButton
              aria-label={embedCloseLabel || "Close"}
              onClick={handleClose}
              sx={{
                color: "text.secondary",
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Box
              dangerouslySetInnerHTML={{ __html: embedCode }}
              sx={{
                width: "100%",
                "& iframe": {
                  width: "100%",
                  minHeight: 400,
                  border: "none",
                },
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
});

export default ActionBanner;
