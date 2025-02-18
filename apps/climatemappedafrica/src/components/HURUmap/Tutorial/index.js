import { styled } from "@mui/material/styles";
import { TourProvider, useTour } from "@reactour/tour";
import PropTypes from "prop-types";
import React, { useState } from "react";

import Connector from "@/climatemappedafrica/components/HURUmap/Tutorial/Connector";
import TutorialStep from "@/climatemappedafrica/components/HURUmap/Tutorial/TutorialStep";

const StyledTour = styled(TourProvider)(({ theme }) => ({
  width: theme.typography.pxToRem(1000),
  maxWidth: "100vw  !important",
  top: `${theme.typography.pxToRem(200)} !important`,
  left: "50% !important",
  transform: "translateX(-50%) !important",
  paddingBottom: `${theme.typography.pxToRem(48.62)} !important`,
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: theme.typography.pxToRem(10),
  "--reactour-accent": "#1C2030",
}));

function Tutorial({ children, defaultOpen = false, items }) {
  const { setIsOpen } = useTour();
  setIsOpen(defaultOpen);

  const [isOpened, setIsOpened] = useState(false);

  const setTourOpened = () => {
    setIsOpened(true);
  };
  const setTourClosed = () => {
    setIsOpened(false);
  };

  return (
    <StyledTour
      padding={{ mask: 0 }}
      styles={{
        dot: (base) => ({
          ...base,
          width: 16,
          height: 16,
          border: "2px solid #1C2030",
        }),
        maskWrapper: (base) => ({
          ...base,
          color: "#666666",
          opacity: 0.5,
        }),
      }}
      position="center"
      showPrevNextButtons={false}
      showBagde={false}
      defaultOpen={defaultOpen}
      afterOpen={setTourOpened}
      beforeClose={setTourClosed}
      showCloseButton={false}
      accentColor="#fff"
      steps={items?.map((item, index) => ({
        selector: item?.selector,
        content: <TutorialStep activeStep={index} {...item} />,
      }))}
    >
      {children}
      {isOpened && <Connector />}
    </StyledTour>
  );
}

Tutorial.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  children: PropTypes.node,
  defaultOpen: PropTypes.bool,
};

export default Tutorial;
