import { Section, RichTypography } from "@commons-ui/core";
import { Figure, Link } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import { Box, Grid, IconButton, SvgIcon, Typography } from "@mui/material";

import ArrowBackIcon from "@/trustlab/assets/icons/arrow-left.svg";

function Banner({
  backgroundColor,
  textColor,
  title,
  hasBackButton,
  description = "",
  image,
  blockType,
  backButton,
}) {
  const hasImage = image && image.url;
  const isPageHeader = blockType === "page-header";

  return (
    <Box
      component="section"
      sx={{
        backgroundColor,
        py: 8,
      }}
    >
      <Section>
        {hasBackButton && (
          <Box
            href={backButton?.href}
            display="flex"
            component={backButton?.href ? Link : "div"}
            alignItems="center"
            mb={2}
          >
            <IconButton
              sx={{
                color: textColor,
              }}
            >
              <SvgIcon component={ArrowBackIcon} inheritViewBox />
            </IconButton>
            <Typography variant="body1" sx={{ color: textColor }}>
              {backButton.label}
            </Typography>
          </Box>
        )}
        <Grid container alignItems="center">
          <Grid
            item
            xs={12}
            sm={hasImage ? 9 : 12}
            sx={{
              px: { xs: 2.5, sm: 0 },
            }}
          >
            <RichTypography
              color={textColor}
              variant={isPageHeader ? "display2" : "display3"}
              sx={{
                mb: 4,
                textAlign: "left",
                fontSize: {
                  xs: 40,
                  sm: 64,
                },
              }}
            >
              {title}
            </RichTypography>
            {description &&
              (typeof description === "string" ? (
                <RichTypography
                  color={textColor}
                  variant={isPageHeader ? "subheading1" : "p1"}
                  sx={{ mb: 4 }}
                >
                  {description}
                </RichTypography>
              ) : (
                <LexicalRichText
                  TypographyProps={{
                    color: textColor,
                    variant: isPageHeader ? "subheading1" : "p1",
                    LinkProps: {
                      color: textColor,
                      textDecoration: "underline",
                      textDecorationColor: textColor,
                    },
                    sx: { mb: 4, textAlign: "left" },
                  }}
                  elements={description}
                />
              ))}
          </Grid>
          {hasImage && (
            <Grid item container xs={12} sm={3} justifyContent="center">
              <Figure
                ImageProps={{
                  alt: image.alt,
                  src: image.url,
                }}
                sx={{
                  height: isPageHeader ? "300px" : "200px",
                  width: isPageHeader ? "300px" : "200px",
                }}
              />
            </Grid>
          )}
        </Grid>
      </Section>
    </Box>
  );
}

export default Banner;
