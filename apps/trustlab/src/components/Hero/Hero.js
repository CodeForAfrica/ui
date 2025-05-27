import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Section } from "@commons-ui/core";
import { Slide } from "@mui/material";
import { Link } from "@commons-ui/next";

const Hero = ({ slides }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % slides.length);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep === 0 ? slides.length - 1 : prevActiveStep - 1,
    );
  };

  return (
    <Box bgcolor="common.black" color="common.white">
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
            key={index}
            direction={"left"}
            in={activeStep === index}
            mountOnEnter
            unmountOnExit
            timeout={{ enter: 800, exit: 800 }}
            appear={false}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundImage: slide.backgroundImage
                  ? `url(${slide.backgroundImage})`
                  : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: "#fff",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  pointerEvents: "none",
                  zIndex: 1,
                },
              }}
            >
              <Section
                sx={{
                  mt: 10,
                  px: { xs: 2.5, sm: 0 },
                }}
              >
                <Typography variant="display1" gutterBottom>
                  {slide.title}
                </Typography>
                <Typography variant="h3" gutterBottom>
                  {slide.subtitle}
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  {slide.description}
                </Typography>
                {slide.buttonText && (
                  <Button
                    component={slide.buttonLink ? Link : undefined}
                    href={slide.buttonLink}
                    variant="outlined"
                    sx={{
                      backgroundColor: "common.white",
                      color: "#463E3E",
                      border: "none",
                      "&:hover": {
                        transform: "scale(0.95)",
                      },
                    }}
                  >
                    {slide.buttonText}
                  </Button>
                )}
              </Section>
            </Box>
          </Slide>
        ))}
        <Section
          sx={{
            position: "relative",
            px: { xs: 2.5, sm: 6, md: 0 },
          }}
        >
          <Box sx={{ position: "absolute", top: 312 }}>
            {slides.map((_, index) => (
              <Button
                key={slides[index].title}
                onClick={() => setActiveStep(index)}
                sx={{
                  width: 12,
                  height: 12,
                  minWidth: 0,
                  borderRadius: "50%",
                  border: "1px solid white",
                  backgroundColor:
                    activeStep === index ? "white" : "transparent",
                  mx: 0.5,
                  p: 0,
                }}
              />
            ))}
          </Box>
        </Section>
      </Box>
    </Box>
  );
};

export default Hero;
