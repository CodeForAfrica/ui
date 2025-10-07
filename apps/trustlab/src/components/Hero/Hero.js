import { Section } from "@commons-ui/core";
import { Figure, Link } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import {
  useTheme,
  Slide,
  Box,
  Button,
  Grid2 as Grid,
  IconButton,
  SvgIcon,
} from "@mui/material";
import React, { forwardRef, useRef, useState, useEffect } from "react";

import ChevronRightDouble from "@/trustlab/assets/icons/Type=chevronRightDouble, Size=20, Color=currentColor.svg";
import Line from "@/trustlab/assets/line.svg";

const direction = (activeStep, prevStep, index) => {
  // Going backwards, slide right
  if (activeStep < prevStep) {
    return activeStep === index ? "right" : "left";
  }
  // Going forward, slide left
  return activeStep === index ? "left" : "right";
};

const Hero = forwardRef(function Hero({ slides }, ref) {
  const [activeStep, setActiveStep] = useState(0);
  // NOTE(kilemensi): needed for Slide.easing
  const theme = useTheme();
  // NOTE(kilemensi): useRef 'cause we need to remember prev step without a rerender
  const prevStepRef = useRef(0);
  // Automatically move to next slide every 10s
  const [autoSlide, setAutoSlide] = useState(true);

  useEffect(() => {
    if (slides.length <= 1 || !autoSlide) {
      return undefined;
    }
    const timer = setInterval(() => {
      setActiveStep((prevStep) => {
        prevStepRef.current = prevStep;
        if (prevStep >= slides.length - 1) {
          return 0;
        }
        return prevStep + 1;
      });
    }, 10000);
    return () => clearInterval(timer);
  }, [slides.length, autoSlide]);

  if (!slides?.length) {
    return null;
  }
  return (
    <Section
      sx={{
        maxWidth: { md: "100%", xs: "100%" },
        backgroundColor: slides[activeStep]?.backgroundColor,
      }}
      color="common.white"
      fixed={false}
      ref={ref}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: "808px", sm: "1074px", md: "562px" },
          overflow: "hidden",
          display: "flex",
        }}
      >
        {slides.map((slide, index) => {
          const isReversed = slide.imagePosition === "left";
          return (
            <Slide
              key={slide.id}
              appear={false}
              direction={direction(activeStep, prevStepRef.current, index)}
              easing={{
                enter: theme.transitions.easing.easeInOut,
                exit: theme.transitions.easing.easeInOut,
              }}
              in={activeStep === index}
              timeout={800}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    pt: 6,
                    px: { xs: 2.5, md: 0 },
                    margin: "0 auto",
                    maxWidth: theme.contentWidths.values,
                  }}
                >
                  <Grid
                    container
                    rowSpacing={4}
                    columnSpacing={2}
                    alignItems="center"
                  >
                    <Grid size={{ xs: 12, md: 6 }} order={isReversed ? 2 : 1}>
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
                      size={{ xs: 12, md: 6 }}
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
                          maxWidth: { xs: "100%", sm: "465px" },
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
        })}
        {slides.length > 1 ? (
          <Box
            sx={{
              position: "absolute",
              bottom: { xs: 46, md: 62 },
              left: "50%",
              transform: "translateX(-50%)",
              px: { xs: 2.5, sm: 0 },
              height: "50px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.40)",
                transform: "rotate(180deg)",
                mr: 1.875,
                height: "50px",
                width: "50px",
                "&:hover": {
                  backgroundColor: slides[activeStep].buttons.backgroundColor,
                  color: slides[activeStep].buttons.textColor,
                },
                "&:disabled": {
                  backgroundColor: "common.white",
                  cursor: "no-drop",
                },
              }}
              onClick={() =>
                setActiveStep((prevStep) => {
                  prevStepRef.current = prevStep;
                  return prevStep - 1;
                })
              }
              disabled={activeStep <= 0}
            >
              <SvgIcon
                sx={{
                  fill: "none",
                  fontSize: "24px",
                }}
                viewBox="0 0 20 20"
                component={ChevronRightDouble}
              />
            </IconButton>
            {slides.map((slide, index) => (
              <Button
                key={slide.id}
                onClick={() => {
                  setActiveStep((prevStep) => {
                    prevStepRef.current = prevStep;
                    return index;
                  });
                  setAutoSlide(false);
                }}
                sx={{
                  width: 12,
                  height: 12,
                  minWidth: 0,
                  borderRadius: "50%",
                  border: "none",
                  backgroundColor: activeStep === index ? "#717680" : "#A4A7AE",
                  mx: 0.5,
                  p: 0,
                }}
              />
            ))}
            <IconButton
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.40)",
                ml: 1.875,
                height: "50px",
                width: "50px",
                "&:hover": {
                  backgroundColor: slides[activeStep].buttons.backgroundColor,
                  color: slides[activeStep].buttons.textColor,
                },
                "&:disabled": {
                  backgroundColor: "common.white",
                  cursor: "no-drop",
                },
              }}
              disabled={activeStep >= slides.length - 1}
              onClick={() => {
                setActiveStep((prevStep) => {
                  prevStepRef.current = prevStep;
                  return prevStep + 1;
                });
                setAutoSlide(false);
              }}
            >
              <SvgIcon
                sx={{
                  fill: "none",
                  fontSize: "24px",
                }}
                viewBox="0 0 20 20"
                component={ChevronRightDouble}
              />
            </IconButton>
          </Box>
        ) : null}
      </Box>
    </Section>
  );
});

export default Hero;
