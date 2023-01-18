import Box from "@mui/material/Box";
import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views-react-18-fix";

import MoocSlide from "./MoocSlide";

import { neutral } from "@/charterafrica/colors";

const Mooc = React.forwardRef(function Mooc(props, ref) {
  const { slides, sx } = props;
  const [activeStep, setActiveStep] = useState(0);

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
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            slides={slides.length}
            key={slide.title.content}
          />
        ))}
      </SwipeableViews>
    </Box>
  );
});

export default Mooc;
