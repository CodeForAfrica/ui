import { Figure, Link } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import {
  useTheme,
  Slide,
  Box,
  Button,
  Grid2 as Grid,
  SvgIcon,
} from "@mui/material";
import React from "react";

import Line from "@/trustlab/assets/line.svg";

function HeroSlide({ direction, in: transitionIn, slide, timeout, ...props }) {
  const theme = useTheme();
  const isReversed = slide.imagePosition === "left";

  return (
    <Slide
      {...props}
      appear={false}
      direction={direction}
      easing={{
        enter: theme.transitions.easing.easeInOut,
        exit: theme.transitions.easing.easeInOut,
      }}
      in={transitionIn}
      timeout={timeout}
    >
      <Box
        sx={{
          backgroundColor: slide.backgroundColor,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            pt: { xs: 2.5, md: 6 },
            px: { xs: 2.5, sm: 0 },
            margin: "0 auto",
            maxWidth: theme.contentWidths.values,
          }}
        >
          <Grid container rowSpacing={4} columnSpacing={2} alignItems="center">
            <Grid size={{ xs: 12, ss: 6 }} order={isReversed ? 2 : 1}>
              <LexicalRichText
                elements={slide.title}
                TypographyProps={{
                  variant: "display2",
                  color: slide.textColor,
                  sx: {
                    fontSize: { xs: "40px", sm: "64px" },
                    lineHeight: { xs: "40px", sm: "64px" },
                  },
                }}
              />

              <LexicalRichText
                elements={slide.description}
                TypographyProps={{
                  variant: "h1",
                  sx: {
                    mt: 2,
                    color: slide.textColor,
                    fontSize: { xs: "24px", sm: "36px" },
                    fontWeight: 500,
                    lineHeight: { xs: "32px", sm: "40px" },
                  },
                }}
              />
              {slide.buttons?.links?.length > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    mt: 3,
                  }}
                >
                  {slide.buttons.links.map((link) => (
                    <Button
                      key={link.label}
                      variant="contained"
                      color="primary"
                      href={link.href}
                      component={link.href ? Link : undefined}
                      sx={{
                        backgroundColor: slide.buttons.backgroundColor,
                        color: slide.buttons.textColor,
                        border: "none",
                        textTransform: "none",
                        height: "50px",
                      }}
                    >
                      {link.label}
                    </Button>
                  ))}
                </Box>
              )}
            </Grid>
            <Grid
              size={{ xs: 12, ss: 6 }}
              sx={{
                display: "flex",
                justifyContent: {
                  xs: "flex-start",
                  md: isReversed ? "center" : "flex-end",
                },
              }}
              order={isReversed ? 1 : 2}
            >
              <Figure
                ImageProps={{
                  alt: slide.image.alt,
                  src: slide.image.url,
                  sx: {
                    objectPosition: { xs: "left", md: "right" },
                    objectFit: "contain",
                  },
                }}
                sx={{
                  height: { xs: "402px", sm: "600px", md: "416px" },
                  width: { xs: "100%", md: "321.6px" },
                }}
              />
            </Grid>
          </Grid>
        </Box>
        {slide?.divider && (
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              backgroundColor: "#000",
              height: "30px",
              width: "100%",
              py: 1.5,
              px: { xs: 2.5, sm: 0 },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SvgIcon
              component={Line}
              width="100%"
              viewBox="0 0 1000 10"
              sx={{
                maxWidth: theme.contentWidths.values,
                width: "100%",
              }}
            />
          </Box>
        )}
      </Box>
    </Slide>
  );
}

export default HeroSlide;
