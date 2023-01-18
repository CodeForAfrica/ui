import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import React, { useState, useRef } from "react";
import SwipeableViews from "react-swipeable-views-react-18-fix";

import MoocSlide from "./MoocSlide";

import { neutral } from "@/charterafrica/colors";

const Mooc = React.forwardRef(function Mooc(props, ref) {
  const { slides, sx } = props;
  const [activeStep, setActiveStep] = useState(0);
  const stepperRef = useRef();
  React.useEffect(() => {
    if (stepperRef.current) {
      const dotsEl = stepperRef.current.getElementsByClassName(
        "MuiMobileStepper-dots"
      )[0];
      if (dotsEl) {
        dotsEl.childNodes.forEach((dotEl, i) => {
          dotEl.addEventListener("click", () => setActiveStep(i));
        });
      }
    }
  }, [stepperRef, setActiveStep]);

  if (!slides?.length) {
    return null;
  }

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box bgcolor={neutral[900]} ref={ref} sx={sx}>
      <SwipeableViews
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {slides.map((slide) => (
          <MoocSlide
            {...slide}
            activeStep
            {...slides.length}
            stepperRef={stepperRef}
            key={slide.title.content}
          />
        ))}
      </SwipeableViews>
      <MobileStepper
        variant="dots"
        steps={slides.length}
        position="static"
        activeStep={activeStep}
        sx={{
          bgcolor: "neutral.dark",
          flexGrow: 1,
          justifyContent: "center",
          p: 1.25,
          "& .MuiMobileStepper-dots": {
            gap: "20px",
          },
          "& .MuiMobileStepper-dot": {
            background: "none",
            border: 1,
            borderColor: "secondary.main",
            height: 10,
            width: 10,
            "& :hover": {
              cursor: "pointer",
            },
          },
          "& .MuiMobileStepper-dotActive": {
            bgcolor: "secondary.main",
          },
        }}
        ref={stepperRef}
      />
    </Box>
  );
});

export default Mooc;
