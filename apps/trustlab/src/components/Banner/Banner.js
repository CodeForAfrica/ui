import { Section, RichTypography } from "@commons-ui/core";
import { Figure } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import { Box, Grid } from "@mui/material";

function Banner({
  backgroundColor,
  textColor,
  title,
  description,
  image,
  isPageHeader,
}) {
  const hasImage = image && image.url;

  return (
    <Box
      component="section"
      sx={{
        backgroundColor,
        py: 8,
      }}
    >
      <Section>
        <Grid container>
          <Grid item xs={12} md={hasImage ? 9 : 12}>
            <RichTypography
              color={textColor}
              variant={isPageHeader ? "display2" : "display3"}
              sx={{
                mb: 4,
                textAlign: {
                  xs: "center",
                  md: "start",
                },
              }}
            >
              {title}
            </RichTypography>
            {description && (
              <LexicalRichText
                TypographyProps={{
                  color: textColor,
                  variant: isPageHeader ? "subheading1" : "p1",
                  LinkProps: {
                    color: textColor,
                    textDecoration: "underline",
                    textDecorationColor: textColor,
                  },
                  sx: {
                    mb: 4,
                  },
                }}
                elements={description}
              />
            )}
          </Grid>
          {hasImage && (
            <Grid item container xs={12} md={3} lg={3} justifyContent="center">
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
