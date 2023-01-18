import Figure from "@/commons-ui/next/Figure";
import { Section } from "@commons-ui/core";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MobileStepper from "@mui/material/MobileStepper";
import React from "react";

import LineClampedRichTypography from "@/charterafrica/components/LineClampedRichTypography";

const MoocSlide = React.forwardRef(function MoocSlide(props, ref) {
  const { title, image, link, activeStep, slides, stepperRef, sx } = props;

  if (!title || !image || !link) {
    return null;
  }

  return (
    <Section ref={ref} sx={sx}>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box
          flex={1.2}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="start"
          sx={{ gap: 5 }}
        >
          <LineClampedRichTypography
            component="h1"
            textAlign="start"
            typography={{ md: "h1" }}
            variant="h4"
            sx={() => ({
              color: title?.color,
              "&>i": {
                color: "secondary.main",
                fontStyle: "normal",
              },
            })}
          >
            {title?.content || title}
          </LineClampedRichTypography>
          <Button
            color="secondary"
            size="medium"
            variant="contained"
            sx={{ width: "fit-content" }}
          >
            {link?.content}
          </Button>
        </Box>
        <Box
          flex={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Figure
            sx={{ height: 512, width: 329 }}
            ImageProps={{ alt: title, ...image }}
          />
          <MobileStepper
            variant="dots"
            steps={slides}
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
      </Box>
    </Section>
  );
});

export default MoocSlide;
