import { Figure, Link } from "@commons-ui/next";
import { Box, Button } from "@mui/material";
import React from "react";

import RichTypography from "@/charterafrica/components/LineClampedRichTypography";
import RichText from "@/charterafrica/components/RichText";

const CommunityPlatform = React.forwardRef(
  function CommunityPlatform(props, ref) {
    const { background, description, icon, link, name, sx } = props;

    return (
      <Box
        display="flex"
        height={{ xs: "474px", md: "500px" }}
        justifyContent="center"
        position="relative"
        sx={sx}
        ref={ref}
      >
        {/* Background */}
        <Figure
          ImageProps={{
            alt: name,
            src: background.image.src || background.image.url,
            sx: { objectFit: "cover", opacity: 0.3 },
          }}
          sx={{
            alignItems: "center",
            backgroundColor: background.color,
            display: "flex",
            justifyContent: "center",
            height: {
              xs: "474px",
              md: "500px",
            },
            width: "100%",
          }}
        />
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          gap={5}
          position="absolute"
          // center horizontal & vertical while absolute positioned.
          left="50%"
          top="50%"
          maxWidth={{
            xs: "290px",
            sm: "668px",
            md: "284px",
            lg: "380px",
            xl: "540px",
          }}
          wrap="nowrap"
          sx={{
            transform: "translate(-50%,-50%)",
          }}
        >
          <Figure
            ImageProps={{
              alt: name,
              src: icon.src || icon.url,
            }}
            sx={{
              height: 124,
              width: 124,
            }}
          />
          <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
            gap={1.25}
          >
            <RichTypography
              html={false}
              color="textSecondary"
              lineClamp={1}
              variant="h3Small"
              whiteSpace="nowrap"
              sx={(theme) => ({
                minHeight: `calc(${theme.typography.h3Small.fontSize}px * ${theme.typography.h3Small.lineHeight})`,
                [theme.breakpoints.up("md")]: {
                  typography: "h3",
                  minHeight: `calc(${theme.typography.h3.fontSize}px * ${theme.typography.h3.lineHeight})`,
                },
              })}
            >
              {name}
            </RichTypography>
            <RichText
              color="textSecondary"
              elements={description}
              lineClamp={4}
              textAlign="center"
              variant="p3"
              sx={(theme) => ({
                minHeight: `calc(${theme.typography.p3.fontSize}px * ${theme.typography.p3.lineHeight} * 4)`,
              })}
            />
          </Box>
          {link?.label ? (
            <Button
              color="secondary"
              component={link.href ? Link : undefined}
              href={link.href}
              size="small"
              variant="contained"
              sx={{ mt: 2.5, width: "fit-content" }}
            >
              {link.label}
            </Button>
          ) : null}
        </Box>
      </Box>
    );
  },
);

export default CommunityPlatform;
