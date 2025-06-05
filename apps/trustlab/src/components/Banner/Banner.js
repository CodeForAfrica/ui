import { Section, RichTypography } from "@commons-ui/core";
import { Figure } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import { Box, Grid } from "@mui/material";

function Banner({
  backgroundColor,
  textColour,
  title,
  description,
  image,
  isPageHeader,
}) {
  const hasImage = image && image.url;

  return (
    <Section
      sx={{
        maxWidth: { md: "100%", xs: "100%" },
        backgroundColor,
      }}
      fixed={false}
    >
      <Box
        sx={(theme) => ({
          maxWidth: theme.contentWidths.values,
          px: { xs: 2.5, sm: 0 },
          py: { xs: 5, md: 7, lg: 10 },
          m: "0 auto",
        })}
      >
        <Grid container>
          <Grid item xs={12} md={hasImage ? 9 : 12}>
            <RichTypography
              color={textColour}
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
                  color: textColour,
                  variant: isPageHeader ? "subheading1" : "p1",
                  LinkProps: {
                    color: textColour,
                    textDecoration: "underline",
                    textDecorationColor: textColour,
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
      </Box>
    </Section>
  );
}

export default Banner;
