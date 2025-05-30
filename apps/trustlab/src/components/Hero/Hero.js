import { Section } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import { Slide, Box, Button } from "@mui/material";
import React, { forwardRef, useState } from "react";

import { neutral } from "@/trustlab/colors";

const Hero = forwardRef(function Hero({ slides }, ref) {
  const [activeStep, setActiveStep] = useState(0);
  const [prevStep, setPrevStep] = useState(0);

  const handleStepChange = (index) => {
    setPrevStep(activeStep);
    setActiveStep(index);
  };

  if (!slides || !slides.length) {
    return null;
  }
  return (
    <Section
      sx={{
        maxWidth: { md: "100%", xs: "100%" },
      }}
      bgcolor="common.black"
      color="common.white"
      fixed={false}
      ref={ref}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "500px",
          overflow: "hidden",
        }}
      >
        {slides.map((slide, index) => (
          <Slide
            key={slide.id}
            direction={activeStep > prevStep ? "left" : "right"}
            in={activeStep === index}
            mountOnEnter
            unmountOnExit
            timeout={{ enter: 800, exit: 800 }}
            easing={{ enter: "ease-in-out", exit: "ease-in-out" }}
            appear={false}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundImage: slide.backgroundImage?.url
                  ? `url(${slide.backgroundImage?.url})`
                  : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  zIndex: 1,
                }}
              >
                <Box
                  sx={(theme) => ({
                    pt: 10,
                    px: { xs: 2.5, sm: 0 },
                    margin: "0 auto",
                    maxWidth: theme.contentWidths.values,
                  })}
                >
                  <LexicalRichText
                    elements={slide.title}
                    TypographyProps={{
                      color: "text.secondary",
                      gutterBottom: true,
                      variant: "display1",
                    }}
                  />
                  <LexicalRichText
                    elements={slide.subtitle}
                    TypographyProps={{
                      variant: "h1",
                      color: "text.secondary",
                    }}
                  />
                  <LexicalRichText
                    elements={slide.description}
                    TypographyProps={{
                      variant: "h3",
                      color: "text.secondary",
                      sx: { mt: 8 },
                    }}
                  />

                  {slide.href && (
                    <Button
                      component={slide.href ? Link : undefined}
                      href={slide.href}
                      variant="outlined"
                      sx={{
                        mt: 2,
                        "&:hover": {
                          transform: "scale(0.95)",
                        },
                        border: {
                          xs: "0.27px solid",
                          sm: "0.53px solid",
                          md: "0.8px solid",
                          lg: "1px solid",
                          xl: "1.33px solid",
                        },
                        gap: {
                          xs: "2.17px",
                          sm: "4.27px",
                          md: "6.4px",
                          lg: "8px",
                          xl: "10.67px",
                        },
                        padding: {
                          xs: "3.25px",
                          sm: "6.4px",
                          md: "9.6px",
                          lg: "12px",
                          xl: "16px",
                        },
                      }}
                    >
                      {slide.label}
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
          </Slide>
        ))}
        <Box
          sx={(theme) => ({
            position: "relative",
            px: { xs: 2.5, sm: 6, md: 0 },
            maxWidth: theme.contentWidths.values,
            m: "0 auto",
          })}
        >
          <Box
            sx={{
              position: "absolute",
              left: 0,
              top: { sm: 400, xs: 450 },
              px: { xs: 2.5, sm: 0 },
            }}
          >
            {slides.map((_, index) => (
              <Button
                key={slides[index].id}
                onClick={() => handleStepChange(index)}
                sx={{
                  width: 16,
                  height: 16,
                  minWidth: 16,
                  borderRadius: "50%",
                  border: "1px solid",
                  borderColor: neutral[200],
                  backgroundColor:
                    activeStep === index ? neutral[200] : "transparent",
                  mx: 0.5,
                  p: 0,
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Section>
  );
});

export default Hero;
