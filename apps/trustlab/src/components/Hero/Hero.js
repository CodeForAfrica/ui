import { Section } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import { Slide, Box, Button } from "@mui/material";
import React, { forwardRef, useState } from "react";

import { neutral } from "@/trustlab/colors";

const Hero = forwardRef(function Hero({ slides }, ref) {
  const [activeStep, setActiveStep] = useState(0);
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
          backgroundColor: "common.black",
        }}
      >
        {slides.map((slide, index) => (
          <Slide
            key={slide.id}
            direction="left"
            in={activeStep === index}
            mountOnEnter
            unmountOnExit
            timeout={{ enter: 800, exit: 0 }}
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
                color: "#fff",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
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
                      variant: "display1",
                    }}
                  />
                  <LexicalRichText
                    elements={slide.subtitle}
                    TypographyProps={{
                      variant: "h1",
                      gutterBottom: true,
                    }}
                  />
                  <LexicalRichText
                    elements={slide.description}
                    TypographyProps={{
                      variant: "h3",
                      sx: { mt: 2 },
                    }}
                  />

                  {slide.href && (
                    <Button
                      component={slide.href ? Link : undefined}
                      href={slide.href}
                      variant="outlined"
                      sx={{
                        mt: 2,
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
              top: { sm: 336, xs: 400 },
              px: { xs: 2.5, sm: 0 },
            }}
          >
            {slides.map((_, index) => (
              <Button
                key={slides[index].title}
                onClick={() => setActiveStep(index)}
                sx={{
                  width: 12,
                  height: 12,
                  minWidth: 0,
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
