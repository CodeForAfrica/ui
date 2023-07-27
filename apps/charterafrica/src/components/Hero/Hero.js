import { Box, MobileStepper } from "@mui/material";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import SwipeableViews from "react-swipeable-views-react-18-fix";

import Slide from "./Slide";

const Hero = React.forwardRef(function Hero(props, ref) {
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

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  if (!slides?.length) {
    return null;
  }
  return (
    <Box bgcolor="neutral.dark" sx={sx} ref={ref}>
      <SwipeableViews
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {slides.map((slide) => (
          <Slide {...slide} key={slide.id} />
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

Hero.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      background: PropTypes.shape({}),
      description: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.node]),
      title: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.node]),
    })
  ),
};

Hero.defaultProps = {
  slides: undefined,
};

export default Hero;
