import { Section, RichTypography } from "@commons-ui/core";
import { Figure, Link } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import { Box, Grid2 as Grid, SvgIcon, Typography } from "@mui/material";

import ArrowBackIcon from "@/trustlab/assets/icons/Type=arrow-back, Size=24, Color=CurrentColor.svg";

function Banner({
  backgroundColor,
  component = "section",
  textColor,
  title,
  description = "",
  image,
  blockType,
  backButton,
}) {
  const hasImage = image && image.url;
  const isPageHeader = blockType === "page-header";

  return (
    <Box
      component={component}
      sx={{
        backgroundColor,
        py: { xs: 4, sm: 6, md: 8 },
      }}
    >
      <Section sx={{ px: { xs: 2.5, sm: 0 } }}>
        {backButton?.href && (
          <Typography
            href={backButton.href}
            color={textColor}
            component={Link}
            display="flex"
            alignItems="center"
            columnGap={1}
            variant="body1"
            mb={2}
          >
            <SvgIcon component={ArrowBackIcon} inheritViewBox />
            {backButton.label}
          </Typography>
        )}
        <Grid
          container
          alignItems="center"
          justifyContent={{ sm: "space-between" }}
          spacing={{ xs: 2.5, md: 2 }}
        >
          <Grid size={{ xs: 12, sm: hasImage ? 9 : 12 }}>
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
            <Grid
              container
              size={{ xs: 12, sm: "grow" }}
              justifyContent={{ sm: "flex-end" }}
            >
              <Figure
                ImageProps={{
                  alt: image.alt,
                  src: image.url,
                  sx: {
                    objectPosition: { xs: "left", sm: "right" },
                  },
                }}
                sx={{
                  height: "200px",
                  width: "200px",
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
